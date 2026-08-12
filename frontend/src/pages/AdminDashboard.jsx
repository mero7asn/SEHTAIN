import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Building2, 
  HeartHandshake, 
  Star, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  Radio,
  Check,
  Clock,
  Sliders,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

const categoryMap = {
  individuals: 'individuals',
  business: 'business',
  charity: 'charity',
  general: 'general'
};

const categoryArabicMap = {
  individuals: 'الأفراد والعائلات (individuals)',
  business: 'الأعمال والضيافة (business)',
  charity: 'سقيا الخير (charity)',
  general: 'عام'
};

const paymentMap = {
  cod: 'cod',
  card: 'card',
  applepay: 'applepay',
  stcpay: 'stcpay'
};

const paymentArabicDisplay = {
  cod: 'cod (الدفع عند الاستلام)',
  card: 'card (بطاقة)',
  applepay: 'applepay (Apple Pay)',
  stcpay: 'stcpay'
};

// Reusable media uploader for site config sections (mainHero, comingSoonHero)
function MediaUploader({ section, config, setConfig, uploadFiles, onUploadingChange }) {
  const [uploading, setUploading] = useState(false);
  const sec = config[section] || {};
  const mode = sec.mediaMode || 'single_image';

  const setMode = (m) => setConfig(prev => ({ ...prev, [section]: { ...prev[section], mediaMode: m } }));

  // fields that must stay arrays vs scalar string
  const isArrayField = (f) => f === 'videos' || f === 'images';

  const handleUpload = async (e, field, multi) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const oversized = files.filter(f => f.size > 4 * 1024 * 1024);
    if (oversized.length) {
      showToast(`حجم الملف كبير جداً (الحد الأقصى 4MB): ${oversized.map(f => f.name).join(', ')}`, 'error');
      return;
    }
    const localUrls = files.map(f => URL.createObjectURL(f));
    // always store arrays for videos/images, string for introVideo
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: isArrayField(field)
          ? [...(Array.isArray(prev[section][field]) ? prev[section][field] : []), ...localUrls]
          : localUrls[0]
      }
    }));
    setUploading(true);
    onUploadingChange?.(true);
    try {
      const uploaded = await uploadFiles(files);
      setConfig(prev => {
        if (isArrayField(field)) {
          const current = Array.isArray(prev[section][field]) ? prev[section][field] : [];
          return { ...prev, [section]: { ...prev[section], [field]: [...current.filter(u => !localUrls.includes(u)), ...uploaded] } };
        }
        return { ...prev, [section]: { ...prev[section], [field]: uploaded[0] } };
      });
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  };

  const remove = (field, idx) => setConfig(prev => ({
    ...prev,
    [section]: { ...prev[section], [field]: (prev[section][field] || []).filter((_, i) => i !== idx) }
  }));

  return (
    <div className="space-y-3 border-t border-slate-100 pt-4">
      <div className="flex items-center justify-between">
        <label className="block font-extrabold text-slate-800 text-sm">وسائط القسم (صور / فيديوهات)</label>
        {uploading && <span className="text-xs text-brand-600 font-bold animate-pulse">جاري الرفع...</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { value: 'single_image', label: 'صورة واحدة', icon: '🖼️' },
          { value: 'loop_images',  label: 'عدة صور (كاروسيل)', icon: '🎠' },
          { value: 'single_video', label: 'فيديو واحد', icon: '🎬' },
          { value: 'two_videos',   label: 'فيديو مقدمة + رئيسي', icon: '🎥' },
          { value: 'loop_videos',  label: 'عدة فيديوهات', icon: '📽️' },
        ].map(opt => (
          <label key={opt.value} className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition ${
            mode === opt.value ? 'border-brand-500 bg-brand-50 text-brand-800' : 'border-slate-200 bg-slate-50'
          }`}>
            <input type="radio" name={`${section}-mode`} value={opt.value} checked={mode === opt.value} onChange={() => setMode(opt.value)} className="accent-brand-600" />
            {opt.icon} {opt.label}
          </label>
        ))}
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
        {(mode === 'single_image' || mode === 'loop_images') && (
          <div>
            <label className="block font-bold text-slate-700 mb-2 text-xs">📤 {mode === 'single_image' ? 'رفع صورة واحدة' : 'رفع عدة صور'}</label>
            <input key={`${section}-img-${(sec.images||[]).length}`} type="file" accept="image/*"
              multiple={mode === 'loop_images'} disabled={uploading}
              onChange={(e) => handleUpload(e, 'images', mode === 'loop_images')} className="w-full text-xs" />
            <div className="mt-2 flex flex-wrap gap-2">
              {(sec.images || []).map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt="" className="w-20 h-20 object-cover rounded-xl border border-slate-200" />
                  <button type="button" onClick={() => remove('images', i)} className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {(mode === 'single_video' || mode === 'loop_videos') && (
          <div>
            <label className="block font-bold text-slate-700 mb-2 text-xs">📤 {mode === 'single_video' ? 'رفع فيديو واحد' : 'رفع عدة فيديوهات'}</label>
            <p className="text-[10px] text-slate-400 mb-2">يدعم: MP4 (H.264/AAC) فقط لضمان التشغيل على جميع المتصفحات</p>
            <input key={`${section}-vid-${(sec.videos||[]).length}`} type="file" accept="video/*"
              multiple={mode === 'loop_videos'} disabled={uploading}
              onChange={(e) => handleUpload(e, 'videos', mode === 'loop_videos')} className="w-full text-xs" />
            <div className="mt-2 flex flex-wrap gap-2">
              {(sec.videos || []).map((src, i) => (
                <div key={i} className="relative">
                  <video src={src} className="w-40 h-24 object-cover rounded-xl border border-slate-200" controls />
                  <button type="button" onClick={() => remove('videos', i)} className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'two_videos' && (
          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">🎬 فيديو المقدمة (مرة واحدة)</label>
              <p className="text-[10px] text-slate-400 mb-2">يدعم: MP4 (H.264/AAC) فقط لضمان التشغيل على جميع المتصفحات</p>
              <input key={`${section}-intro-${sec.introVideo}`} type="file" accept="video/*" disabled={uploading}
                onChange={(e) => handleUpload(e, 'introVideo', false)} className="w-full text-xs" />
              {sec.introVideo && (
                <div className="mt-2 relative inline-block">
                  <video src={Array.isArray(sec.introVideo) ? sec.introVideo[0] : sec.introVideo} controls className="w-48 h-28 rounded-xl border border-slate-200" />
                  <button type="button" onClick={() => setConfig(prev => ({ ...prev, [section]: { ...prev[section], introVideo: '' } }))} className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">✕</button>
                </div>
              )}
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">🔁 الفيديو الرئيسي (يتكرر)</label>
              <input key={`${section}-mainvid-${(sec.videos||[]).length}`} type="file" accept="video/*" disabled={uploading}
                onChange={(e) => handleUpload(e, 'videos', false)} className="w-full text-xs" />
              {(sec.videos || []).map((src, i) => (
                <div key={i} className="mt-2 relative inline-block">
                  <video src={src} controls className="w-48 h-28 rounded-xl border border-slate-200" />
                  <button type="button" onClick={() => remove('videos', i)} className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [b2bRequests, setB2bRequests] = useState([]);
  const [charityRequests, setCharityRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMediaUploading, setIsMediaUploading] = useState(false);
  
  // Real-time Auto Refresh State
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New/Edit Product Form Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDiscountPrice, setProdDiscountPrice] = useState('');
  const [prodVolume, setProdVolume] = useState('500 مل');
  const [prodPkgQty, setProdPkgQty] = useState('24');
  const [prodCategory, setProdCategory] = useState('individuals');
  const [prodStock, setProdStock] = useState('100');

  // Media Mode State
  // Modes: single_image | two_videos | single_video | loop_videos | loop_images
  const [prodMediaMode, setProdMediaMode] = useState('single_image');
  const [prodIsComingSoon, setProdIsComingSoon] = useState(false);
  const [prodImages, setProdImages] = useState([]);        // File objects or existing URLs
  const [prodVideos, setProdVideos] = useState([]);        // File objects or existing URLs
  const [prodIntroVideo, setProdIntroVideo] = useState(null); // File or existing URL
  const [prodImagePreviews, setProdImagePreviews] = useState([]);
  const [prodVideoPreviews, setProdVideoPreviews] = useState([]);
  const [prodIntroPreviews, setProdIntroPreviews] = useState(null);

  const fetchData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    setIsRefreshing(true);
    try {
      const [statsRes, prodRes, ordRes, b2bRes, charityRes, revRes, configRes] = await Promise.all([
        API.get('/stats'),
        API.get('/products'),
        API.get('/orders'),
        API.get('/b2b'),
        API.get('/charity'),
        API.get('/reviews/all'),
        API.get('/config')
      ]);

      setStats(statsRes.data);
      setProducts(prodRes.data);
      setOrders(ordRes.data);
      setB2bRequests(b2bRes.data);
      setCharityRequests(charityRes.data);
      setReviews(revRes.data);
      setSiteConfig(configRes.data);
      setLastUpdatedTime(new Date());
    } catch (err) {
      console.error(err);
      if (!isSilent) {
        showToast('حدث خطأ أثناء تحميل بيانات لوحة التحكم', 'error');
      }
    } finally {
      if (!isSilent) setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (isAdmin) {
      fetchData(false);
    }
  }, [isAdmin]);

  // Real-time Auto-Polling (Interval every 3 seconds) — paused on settings tab
  useEffect(() => {
    let intervalId = null;
    if (isAdmin && isAutoRefreshEnabled && activeTab !== 'settings') {
      intervalId = setInterval(() => {
        fetchData(true);
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAdmin, isAutoRefreshEnabled, activeTab]);

  if (!user || !isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">غير مصرح: لوحة التحكم مخصصة للمدراء فقط</h2>
        <Link to="/login" className="inline-block bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          تسجيل الدخول كمدير
        </Link>
      </div>
    );
  }

  // Upload files to backend, return array of URLs
  const uploadFiles = async (files) => {
    if (!files || files.length === 0) return [];
    const oversized = files.filter(f => f.size > 4 * 1024 * 1024);
    if (oversized.length) {
      const names = oversized.map(f => f.name).join(', ');
      showToast(`حجم الملف كبير جداً (الحد الأقصى 4MB): ${names}`, 'error');
      throw new Error('FILE_TOO_LARGE');
    }
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    const res = await API.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data.urls;
  };

  // Handle Product Create / Update
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setIsUploadingMedia(true);
    try {
      // Upload new files (File objects) — existing string URLs are passed through as-is
      let finalImages = [];
      let finalVideos = [];
      let finalIntroVideo = '';

      if (prodMediaMode === 'single_image' || prodMediaMode === 'loop_images') {
        const newFiles = prodImages.filter(f => f instanceof File);
        const existingUrls = prodImages.filter(f => typeof f === 'string');
        const uploaded = await uploadFiles(newFiles);
        finalImages = [...existingUrls, ...uploaded];
      }

      if (prodMediaMode === 'single_video' || prodMediaMode === 'loop_videos') {
        const newFiles = prodVideos.filter(f => f instanceof File);
        const existingUrls = prodVideos.filter(f => typeof f === 'string');
        const uploaded = await uploadFiles(newFiles);
        finalVideos = [...existingUrls, ...uploaded];
      }

      if (prodMediaMode === 'two_videos') {
        // Intro video
        if (prodIntroVideo instanceof File) {
          const uploaded = await uploadFiles([prodIntroVideo]);
          finalIntroVideo = uploaded[0] || '';
        } else if (typeof prodIntroVideo === 'string') {
          finalIntroVideo = prodIntroVideo;
        }
        // Main loop video
        const newFiles = prodVideos.filter(f => f instanceof File);
        const existingUrls = prodVideos.filter(f => typeof f === 'string');
        const uploaded = await uploadFiles(newFiles);
        finalVideos = [...existingUrls, ...uploaded];
      }

      const payload = {
        name: prodName,
        description: prodDesc,
        price: Number(prodPrice),
        discountPrice: prodDiscountPrice ? Number(prodDiscountPrice) : 0,
        volume: prodVolume,
        packageQuantity: Number(prodPkgQty),
        category: prodCategory,
        stock: Number(prodStock),
        mediaMode: prodMediaMode,
        isComingSoon: prodIsComingSoon,
        images: finalImages,
        videos: finalVideos,
        introVideo: finalIntroVideo
      };

      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, payload);
        showToast('تم تحديث بيانات المنتج بنجاح', 'success');
      } else {
        await API.post('/products', payload);
        showToast('تمت إضافة المنتج الجديد بنجاح', 'success');
      }

      setIsProductModalOpen(false);
      resetProductForm();
      fetchData(true);
    } catch (err) {
      showToast(err.response?.data?.message || 'فشل في حفظ المنتج', 'error');
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleEditProduct = (p) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdDesc(p.description);
    setProdPrice(p.price);
    setProdDiscountPrice(p.discountPrice || '');
    setProdVolume(p.volume);
    setProdPkgQty(p.packageQuantity);
    setProdCategory(p.category);
    setProdStock(p.stock);
    setProdMediaMode(p.mediaMode || 'single_image');
    setProdIsComingSoon(p.isComingSoon || false);
    setProdImages(p.images || []);
    setProdVideos(p.videos || []);
    setProdIntroVideo(p.introVideo || null);
    setProdImagePreviews(p.images || []);
    setProdVideoPreviews(p.videos || []);
    setProdIntroPreviews(p.introVideo || null);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('هل أنت تأكيد حذف هذا المنتج؟')) {
      try {
        await API.delete(`/products/${id}`);
        showToast('تم حذف المنتج', 'info');
        fetchData(true);
      } catch (err) {
        showToast('فشل حذف المنتج', 'error');
      }
    }
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdDiscountPrice('');
    setProdVolume('500 مل');
    setProdPkgQty('24');
    setProdCategory('individuals');
    setProdStock('100');
    setProdMediaMode('single_image');
    setProdIsComingSoon(false);
    setProdImages([]);
    setProdVideos([]);
    setProdIntroVideo(null);
    setProdImagePreviews([]);
    setProdVideoPreviews([]);
    setProdIntroPreviews(null);
  };

  // Helper: handle image file selection (builds preview URLs)
  const handleImageFiles = (e, multi = false) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (multi) {
      setProdImages(prev => [...prev, ...files]);
      const previews = files.map(f => URL.createObjectURL(f));
      setProdImagePreviews(prev => [...prev, ...previews]);
    } else {
      setProdImages([files[0]]);
      setProdImagePreviews([URL.createObjectURL(files[0])]);
    }
  };

  // Helper: handle video file selection
  const handleVideoFiles = (e, multi = false) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (multi) {
      setProdVideos(prev => [...prev, ...files]);
      const previews = files.map(f => URL.createObjectURL(f));
      setProdVideoPreviews(prev => [...prev, ...previews]);
    } else {
      setProdVideos([files[0]]);
      setProdVideoPreviews([URL.createObjectURL(files[0])]);
    }
  };

  // Helper: handle intro video selection
  const handleIntroVideoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProdIntroVideo(file);
    setProdIntroPreviews(URL.createObjectURL(file));
  };

  const removeImage = (idx) => {
    setProdImages(prev => prev.filter((_, i) => i !== idx));
    setProdImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const removeVideo = (idx) => {
    setProdVideos(prev => prev.filter((_, i) => i !== idx));
    setProdVideoPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, { orderStatus: newStatus });
      showToast(`تم تحديث حالة الطلب إلى: ${newStatus}`, 'success');
      fetchData(true);
    } catch (err) {
      showToast('فشل في تحديث حالة الطلب', 'error');
    }
  };

  // Update B2B Request Status
  const handleUpdateB2bStatus = async (id, newStatus) => {
    try {
      await API.put(`/b2b/${id}`, { status: newStatus });
      showToast(`تم تحديث حالة طلب B2B إلى: ${newStatus}`, 'success');
      fetchData(true);
    } catch (err) {
      showToast('فشل في تحديث حالة طلب B2B', 'error');
    }
  };

  // Update Charity Request Status
  const handleUpdateCharityStatus = async (id, newStatus) => {
    try {
      await API.put(`/charity/${id}`, { status: newStatus });
      showToast(`تم تحديث حالة طلب السقيا إلى: ${newStatus}`, 'success');
      fetchData(true);
    } catch (err) {
      showToast('فشل في تحديث حالة طلب السقيا', 'error');
    }
  };

  // Toggle Review Approval Status
  const handleToggleReviewApproved = async (id, currentApproved) => {
    try {
      await API.put(`/reviews/${id}`, { approved: !currentApproved });
      showToast(`تم ${!currentApproved ? 'اعتماد' : 'إلغاء اعتماد'} التقييم`, 'success');
      fetchData(true);
    } catch (err) {
      showToast('فشل التحديث في التقييم', 'error');
    }
  };

  // Delete Review
  const handleDeleteReview = async (id) => {
    if (window.confirm('هل أنت تأكد من حذف هذا التقييم؟')) {
      try {
        await API.delete(`/reviews/${id}`);
        showToast('تم حذف التقييم بنجاح', 'info');
        fetchData(true);
      } catch (err) {
        showToast('فشل حذف التقييم', 'error');
      }
    }
  };

  // Partner Management Helpers
  const addPartner = () => {
    setSiteConfig(prev => ({
      ...prev,
      partnersSection: {
        ...prev.partnersSection,
        partners: [...(prev.partnersSection?.partners || []), { name: '', logo: '' }]
      }
    }));
  };

  const removePartner = (idx) => {
    setSiteConfig(prev => ({
      ...prev,
      partnersSection: {
        ...prev.partnersSection,
        partners: (prev.partnersSection?.partners || []).filter((_, i) => i !== idx)
      }
    }));
  };

  const handlePartnerLogoUpload = async (e, idx) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const oversized = files.filter(f => f.size > 4 * 1024 * 1024);
    if (oversized.length) {
      showToast(`حجم الملف كبير جداً (الحد الأقصى 4MB): ${oversized.map(f => f.name).join(', ')}`, 'error');
      return;
    }
    const localUrl = URL.createObjectURL(files[0]);
    setSiteConfig(prev => {
      const updated = [...(prev.partnersSection?.partners || [])];
      updated[idx] = { ...updated[idx], logo: localUrl };
      return { ...prev, partnersSection: { ...prev.partnersSection, partners: updated } };
    });
    try {
      const uploaded = await uploadFiles(files);
      setSiteConfig(prev => {
        const updated = [...(prev.partnersSection?.partners || [])];
        updated[idx] = { ...updated[idx], logo: uploaded[0] || '' };
        return { ...prev, partnersSection: { ...prev.partnersSection, partners: updated } };
      });
    } catch (err) {
      showToast('فشل رفع شعار الشريك', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">لوحة تحكم إداري صحتين</h1>
          <p className="text-slate-400 text-xs mt-1">مرحباً {user.name} | إدارة المبيعات، الطلبات، والمنتجات</p>
        </div>
        <button
          onClick={() => fetchData(false)}
          className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>تحديث البيانات</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'overview', name: 'لوحة التحكم', icon: LayoutDashboard },
          { id: 'products', name: 'إدارة المنتجات', icon: Package },
          { id: 'orders', name: 'إدارة الطلبات', icon: ShoppingBag },
          { id: 'b2b', name: 'طلبات B2B', icon: Building2 },
          { id: 'charity', name: 'طلبات السقيا', icon: HeartHandshake },
          { id: 'reviews', name: 'التقييمات', icon: Star },
          { id: 'settings', name: 'إعدادات الرئيسية والشعار', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isCurrent = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition whitespace-nowrap ${
                isCurrent 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 font-medium flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-brand-600" />
          <span>جاري تحميل بيانات لوحة التحكم...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">إجمالي المبيعات</span>
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black text-xs">
                      SAR
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">{stats?.totalSales?.toFixed(2) || '0.00'} ريال</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">إجمالي الطلبات</span>
                    <div className="w-8 h-8 bg-sky-50 text-brand-600 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">{stats?.totalOrders || 0}</div>
                  <span className="text-[10px] text-amber-600 font-bold block">{stats?.pendingOrders || 0} طلب قيد المعالجة</span>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">المنتجات</span>
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">{stats?.totalProducts || 0}</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">العملاء</span>
                    <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">{stats?.totalCustomers || 0}</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">طلبات B2B</span>
                    <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">{stats?.totalB2B || 0}</div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">طلبات السقيا</span>
                    <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xl font-black text-slate-900">{stats?.totalCharity || 0}</div>
                </div>

              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-lg">أحدث الطلبات المستلمة (تحديث حقيقي فوري)</h3>
                  <span className="text-xs text-slate-400 font-medium">يتم تحديث الجدول تلقائياً كل 3 ثوانٍ</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                        <th className="p-3">رقم الطلب</th>
                        <th className="p-3">العميل والجوال</th>
                        <th className="p-3">العنوان</th>
                        <th className="p-3">الإجمالي</th>
                        <th className="p-3">طريقة الدفع</th>
                        <th className="p-3">حالة الطلب</th>
                        <th className="p-3">تحديث الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stats?.recentOrders?.map((ord) => (
                        <tr key={ord._id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-brand-600">#{ord.orderNumber}</td>
                          <td className="p-3">
                            <p className="font-bold text-slate-800">{ord.customerInfo?.fullName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{ord.customerInfo?.phone}</p>
                          </td>
                          <td className="p-3 text-slate-600">
                            {ord.shippingAddress?.city} - {ord.shippingAddress?.district}
                          </td>
                          <td className="p-3 font-bold text-slate-900">{ord.total.toFixed(2)} ريال</td>
                          <td className="p-3 font-semibold text-slate-700">{ord.paymentMethod}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                              ord.orderStatus === 'تم التوصيل' ? 'bg-emerald-100 text-emerald-800' :
                              ord.orderStatus === 'خرج للتوصيل' ? 'bg-indigo-100 text-indigo-800' :
                              ord.orderStatus === 'قيد التجهيز' ? 'bg-purple-100 text-purple-800' :
                              ord.orderStatus === 'قيد المعالجة' ? 'bg-sky-100 text-sky-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td className="p-3">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                              className="bg-slate-100 border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none"
                            >
                              <option value="جديد">جديد</option>
                              <option value="قيد المعالجة">قيد المعالجة</option>
                              <option value="قيد التجهيز">قيد التجهيز</option>
                              <option value="خرج للتوصيل">خرج للتوصيل</option>
                              <option value="تم التوصيل">تم التوصيل</option>
                              <option value="ملغي">ملغي</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">إدارة المنتجات المخزون</h2>
                  <p className="text-xs text-slate-500 mt-0.5">تحديث أسعار ومخزون المنتجات تلقائياً وبشكل حي</p>
                </div>
                <button
                  onClick={() => {
                    resetProductForm();
                    setIsProductModalOpen(true);
                  }}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md shadow-brand-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة منتج جديد</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="p-4">المنتج</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">السعر</th>
                        <th className="p-4">الخصم</th>
                        <th className="p-4">المخزون</th>
                        <th className="p-4">التصنيف</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-slate-50">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border border-slate-200 shadow-xs" />
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                              <p className="text-[11px] text-slate-400">{p.volume} | {p.packageQuantity} عبوة</p>
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-slate-600">{p.sku}</td>
                          <td className="p-4 font-black text-slate-900 text-sm">{p.price.toFixed(2)} ريال</td>
                          <td className="p-4 text-rose-600 font-bold">{p.discountPrice ? `${p.discountPrice} ريال` : '-'}</td>
                          <td className="p-4 font-bold text-slate-800">
                            <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-bold">
                              {p.stock} شدة
                            </span>
                          </td>
                          <td className="p-4 font-semibold text-slate-700">
                            {p.category}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditProduct(p)}
                                className="p-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl transition"
                                title="تعديل"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p._id)}
                                className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition"
                                title="حذف"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-slate-900">إدارة طلبات العملاء</h2>
                <p className="text-xs text-slate-500 mt-0.5">تحديث فوري لحالات الطلبات ومتابعة التوصيل</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                        <th className="p-4">رقم الطلب</th>
                        <th className="p-4">العميل والجوال</th>
                        <th className="p-4">العنوان</th>
                        <th className="p-4">الإجمالي</th>
                        <th className="p-4">طريقة الدفع</th>
                        <th className="p-4">حالة الطلب</th>
                        <th className="p-4">تحديث الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-brand-600 text-sm">#{ord.orderNumber}</td>
                          <td className="p-4">
                            <p className="font-bold text-slate-800 text-sm">{ord.customerInfo?.fullName}</p>
                            <p className="text-[11px] text-slate-400 font-mono">{ord.customerInfo?.phone}</p>
                          </td>
                          <td className="p-4 text-slate-600 font-medium">
                            {ord.shippingAddress?.city} - {ord.shippingAddress?.district}
                          </td>
                          <td className="p-4 font-black text-slate-900 text-sm">{ord.total.toFixed(2)} ريال</td>
                          <td className="p-4 text-slate-600 font-semibold">{ord.paymentMethod}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                              ord.orderStatus === 'تم التوصيل' ? 'bg-emerald-100 text-emerald-800' :
                              ord.orderStatus === 'خرج للتوصيل' ? 'bg-indigo-100 text-indigo-800' :
                              ord.orderStatus === 'قيد التجهيز' ? 'bg-purple-100 text-purple-800' :
                              ord.orderStatus === 'قيد المعالجة' ? 'bg-sky-100 text-sky-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                              className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-brand-500 transition cursor-pointer"
                            >
                              <option value="جديد">جديد</option>
                              <option value="قيد المعالجة">قيد المعالجة</option>
                              <option value="قيد التجهيز">قيد التجهيز</option>
                              <option value="خرج للتوصيل">خرج للتوصيل</option>
                              <option value="تم التوصيل">تم التوصيل</option>
                              <option value="ملغي">ملغي</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: B2B REQUESTS */}
          {activeTab === 'b2b' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-slate-900">طلبات عروض أسعار القطاع التجاري (B2B)</h2>
                <p className="text-xs text-slate-500 mt-0.5">تحديث فوري وتواصل مع الشركات والفنادق</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {b2bRequests.map((b) => (
                  <div key={b._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg">{b.companyName}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          المسؤول: <span className="font-bold text-slate-800">{b.contactName}</span> ({b.phone})
                        </p>
                      </div>
                      
                      {/* Status Dropdown */}
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateB2bStatus(b._id, e.target.value)}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none ${
                          b.status === 'تم الاتفاق' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          b.status === 'قيد التواصل' ? 'bg-sky-100 text-sky-800 border-sky-300' :
                          b.status === 'تم الرفض' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                          'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="جديد">جديد</option>
                        <option value="قيد التواصل">قيد التواصل</option>
                        <option value="تم الاتفاق">تم الاتفاق</option>
                        <option value="تم الرفض">تم الرفض</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                      <p><strong>نوع النشاط:</strong> {b.businessType} | <strong>المدينة:</strong> {b.city}</p>
                      <p><strong>الكمية المطلوبة:</strong> <span className="font-bold text-slate-800">{b.quantity}</span></p>
                      {b.notes && <p><strong>ملاحظات:</strong> {b.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHARITY REQUESTS */}
          {activeTab === 'charity' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-slate-900">طلبات سقيا المساجد والخير</h2>
                <p className="text-xs text-slate-500 mt-0.5">تحديث فوري لطلبات التبرع والتوفير للمساجد والجمعيات</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {charityRequests.map((c) => (
                  <div key={c._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg">{c.organizationName}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{c.organizationType} - {c.location}</p>
                      </div>
                      
                      {/* Status Dropdown */}
                      <select
                        value={c.status}
                        onChange={(e) => handleUpdateCharityStatus(c._id, e.target.value)}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none ${
                          c.status === 'تم التوفير' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                          c.status === 'قيد المعالجة' ? 'bg-sky-100 text-sky-800 border-sky-300' :
                          c.status === 'ملغي' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                          'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="جديد">جديد</option>
                        <option value="قيد المعالجة">قيد المعالجة</option>
                        <option value="تم التوفير">تم التوفير</option>
                        <option value="ملغي">ملغي</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                      <p><strong>المستفيدون:</strong> {c.beneficiaries} | <strong>الكمية:</strong> <span className="font-bold text-slate-800">{c.quantity}</span></p>
                      <p><strong>الجوال:</strong> <span className="font-mono">{c.phone}</span></p>
                      {c.notes && <p><strong>ملاحظات:</strong> {c.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-slate-900">آراء وتقييمات العملاء المسجلة</h2>
                <p className="text-xs text-slate-500 mt-0.5">إدارة واعتماد تقييمات العملاء بشكل فوري</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((r) => (
                  <div key={r._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-slate-900 text-base">{r.name}</h4>
                        <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{r.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed">
                        "{r.comment}"
                      </p>
                      {r.orderNumber && (
                        <p className="text-[11px] text-slate-400 font-mono">رقم الطلب: #{r.orderNumber}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                      <button
                        onClick={() => handleToggleReviewApproved(r._id, r.approved)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          r.approved
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        {r.approved ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        <span>{r.approved ? 'معتمد (ظاهر)' : 'معلّق'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteReview(r._id)}
                        className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition"
                        title="حذف التقييم"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SITE CONFIG SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">إعدادات الصفحة الرئيسية والهيدر والفوتر</h2>
                  <p className="text-xs text-slate-500 mt-0.5">التحكم في محتوى وهيدر الهيرو، قسم قريباً، الفوتر، والشعار</p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await API.put('/config', siteConfig);
                      showToast('تم حفظ جميع إعدادات الموقع بنجاح', 'success');
                      fetchData(true);
                    } catch (err) {
                      showToast('فشل حفظ الإعدادات', 'error');
                    }
                  }}
                  disabled={isMediaUploading}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{isMediaUploading ? 'جاري رفع الوسائط...' : 'حفظ جميع التغييرات'}</span>
                </button>
              </div>

              {siteConfig && (
                <div className="space-y-8">
                  {/* 1. Main Hero Settings */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-2">1. إعدادات هيرو الصفحة الرئيسية (Main Hero)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">الشارة العلويّة (Badge)</label>
                        <input type="text" value={siteConfig.mainHero?.badge || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, mainHero: { ...siteConfig.mainHero, badge: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3" />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">العنوان الرئيسي (Title)</label>
                        <input type="text" value={siteConfig.mainHero?.title || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, mainHero: { ...siteConfig.mainHero, title: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">الوصف الفرعي (Description)</label>
                        <textarea rows={2} value={siteConfig.mainHero?.description || ''}
                          onChange={(e) => setSiteConfig({ ...siteConfig, mainHero: { ...siteConfig.mainHero, description: e.target.value } })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3" />
                      </div>
                    </div>
                    {/* Media Uploader */}
                    <MediaUploader
                      section="mainHero"
                      config={siteConfig}
                      setConfig={setSiteConfig}
                      uploadFiles={uploadFiles}
                      onUploadingChange={setIsMediaUploading}
                    />
                  </div>

                  {/* 2. Products Section Header (2 lines) */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                    <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-2">2. وصف قسم المنتجات الحالية (2-Line Description Header)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">الشارة (Badge)</label>
                        <input
                          type="text"
                          value={siteConfig.productsSection?.badge || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            productsSection: { ...siteConfig.productsSection, badge: e.target.value }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">العنوان</label>
                        <input
                          type="text"
                          value={siteConfig.productsSection?.title || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            productsSection: { ...siteConfig.productsSection, title: e.target.value }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">السطر الأول من الوصف</label>
                        <input
                          type="text"
                          value={siteConfig.productsSection?.line1 || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            productsSection: { ...siteConfig.productsSection, line1: e.target.value }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">السطر الثاني من الوصف</label>
                        <input
                          type="text"
                          value={siteConfig.productsSection?.line2 || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            productsSection: { ...siteConfig.productsSection, line2: e.target.value }
                          })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3 & 4. Coming Soon Controls */}
                  <div className="bg-white rounded-3xl p-6 border border-purple-200 bg-purple-50/20 shadow-xs space-y-6">
                    <h3 className="font-extrabold text-purple-900 text-lg border-b border-purple-100 pb-2">3 & 4. التحكم في أقسام (قريباً - Coming Soon)</h3>
                    
                    {/* Coming Soon Hero Controls */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-purple-200">
                        <span className="font-extrabold text-slate-900 text-sm">عرض / إخفاء هيرو "قريباً" (Coming Soon Hero)</span>
                        <button type="button"
                          onClick={() => setSiteConfig({ ...siteConfig, comingSoonHero: { ...siteConfig.comingSoonHero, enabled: !siteConfig.comingSoonHero?.enabled } })}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${siteConfig.comingSoonHero?.enabled ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-700'}`}>
                          {siteConfig.comingSoonHero?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          <span>{siteConfig.comingSoonHero?.enabled ? 'ظاهر للزوار' : 'مخفي عن الزوار'}</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">عنوان هيرو قريباً</label>
                          <input type="text" value={siteConfig.comingSoonHero?.title || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, comingSoonHero: { ...siteConfig.comingSoonHero, title: e.target.value } })}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3" />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">وصف هيرو قريباً</label>
                          <input type="text" value={siteConfig.comingSoonHero?.description || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, comingSoonHero: { ...siteConfig.comingSoonHero, description: e.target.value } })}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3" />
                        </div>
                      </div>
                      {/* Media Uploader */}
                      <MediaUploader
                        section="comingSoonHero"
                        config={siteConfig}
                        setConfig={setSiteConfig}
                        uploadFiles={uploadFiles}
                        onUploadingChange={setIsMediaUploading}
                      />
                    </div>

                    {/* Coming Soon Products Section Controls */}
                    <div className="space-y-4 pt-4 border-t border-purple-100">
                      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-purple-200">
                        <span className="font-extrabold text-slate-900 text-sm">عرض / إخفاء قسم "المنتجات القادمة" (Coming Soon Products)</span>
                        <button
                          type="button"
                          onClick={() => setSiteConfig({
                            ...siteConfig,
                            comingSoonProductsSection: { ...siteConfig.comingSoonProductsSection, enabled: !siteConfig.comingSoonProductsSection?.enabled }
                          })}
                          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                            siteConfig.comingSoonProductsSection?.enabled ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {siteConfig.comingSoonProductsSection?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          <span>{siteConfig.comingSoonProductsSection?.enabled ? 'ظاهر للزوار' : 'مخفي عن الزوار'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">السطر الأول من الوصف</label>
                          <input
                            type="text"
                            value={siteConfig.comingSoonProductsSection?.line1 || ''}
                            onChange={(e) => setSiteConfig({
                              ...siteConfig,
                              comingSoonProductsSection: { ...siteConfig.comingSoonProductsSection, line1: e.target.value }
                            })}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">السطر الثاني من الوصف</label>
                          <input
                            type="text"
                            value={siteConfig.comingSoonProductsSection?.line2 || ''}
                            onChange={(e) => setSiteConfig({
                              ...siteConfig,
                              comingSoonProductsSection: { ...siteConfig.comingSoonProductsSection, line2: e.target.value }
                            })}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                   {/* Partners Section Controls */}
                   <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                     <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-2">إدارة قسم الشركاء (Partners)</h3>

                     <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                       <span className="font-extrabold text-slate-900 text-sm">عرض / إخفاء قسم الشركاء</span>
                       <button type="button"
                         onClick={() => setSiteConfig({
                           ...siteConfig,
                           partnersSection: { ...siteConfig.partnersSection, enabled: !siteConfig.partnersSection?.enabled }
                         })}
                         className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${siteConfig.partnersSection?.enabled ? 'bg-emerald-600 text-white' : 'bg-rose-100 text-rose-700'}`}>
                         {siteConfig.partnersSection?.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                         <span>{siteConfig.partnersSection?.enabled ? 'ظاهر للزوار' : 'مخفي عن الزوار'}</span>
                       </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                       <div>
                         <label className="block font-bold text-slate-700 mb-1">العنوان</label>
                         <input type="text" value={siteConfig.partnersSection?.title || ''}
                           onChange={(e) => setSiteConfig({
                             ...siteConfig,
                             partnersSection: { ...siteConfig.partnersSection, title: e.target.value }
                           })}
                           className="w-full bg-white border border-slate-200 rounded-xl p-3" />
                       </div>
                       <div>
                         <label className="block font-bold text-slate-700 mb-1">الوصف</label>
                         <input type="text" value={siteConfig.partnersSection?.description || ''}
                           onChange={(e) => setSiteConfig({
                             ...siteConfig,
                             partnersSection: { ...siteConfig.partnersSection, description: e.target.value }
                           })}
                           className="w-full bg-white border border-slate-200 rounded-xl p-3" />
                       </div>
                     </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-xs">الشركاء الحاليون</span>
                          <button type="button" onClick={addPartner}
                            className="px-3 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition">
                            + إضافة شريك
                          </button>
                        </div>

                        <div className="space-y-2">
                          {(siteConfig.partnersSection?.partners || []).map((partner, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                              <div className="relative shrink-0">
                                <img src={partner.logo || 'https://via.placeholder.com/80x80?text=Logo'} alt={partner.name || 'شريك'} className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white" />
                                <label className="absolute -bottom-1 -left-1 cursor-pointer">
                                  <input type="file" accept="image/*" className="hidden" disabled={isMediaUploading}
                                    onChange={(e) => handlePartnerLogoUpload(e, idx)} />
                                  <span className="flex items-center justify-center w-5 h-5 bg-brand-600 text-white rounded-full text-[10px] font-bold shadow">📷</span>
                                </label>
                              </div>
                              <div className="flex-1 min-w-0">
                                <input type="text" value={partner.name || ''}
                                  onChange={(e) => {
                                    const updated = [...(siteConfig.partnersSection?.partners || [])];
                                    updated[idx] = { ...updated[idx], name: e.target.value };
                                    setSiteConfig({ ...siteConfig, partnersSection: { ...siteConfig.partnersSection, partners: updated } });
                                  }}
                                  placeholder="اسم الشريك"
                                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs" />
                              </div>
                              <button type="button" onClick={() => removePartner(idx)}
                                className="shrink-0 px-3 py-2 bg-rose-100 text-rose-700 rounded-xl text-[11px] font-bold hover:bg-rose-200 transition">
                                حذف
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>

                   {/* 5. Footer Components Admin Control */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
                    <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-2">5. التحكم الشامل في مكونات الفوتر (Footer Customizer)</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Brand Info Column Toggle */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-slate-800">عمود نبذة الشركة والشعار</span>
                          <input
                            type="checkbox"
                            checked={siteConfig.footer?.showBrandInfo ?? true}
                            onChange={(e) => setSiteConfig({
                              ...siteConfig,
                              footer: { ...siteConfig.footer, showBrandInfo: e.target.checked }
                            })}
                            className="accent-brand-600 w-4 h-4"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="الرقم الضريبي"
                          value={siteConfig.footer?.taxNumber || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            footer: { ...siteConfig.footer, taxNumber: e.target.value }
                          })}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs"
                        />
                      </div>

                      {/* Helpful Links Column Toggle */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-slate-800">عمود الروابط المساعدة</span>
                          <input
                            type="checkbox"
                            checked={siteConfig.footer?.showHelpfulLinks ?? true}
                            onChange={(e) => setSiteConfig({
                              ...siteConfig,
                              footer: { ...siteConfig.footer, showHelpfulLinks: e.target.checked }
                            })}
                            className="accent-brand-600 w-4 h-4"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="عنوان العمود"
                          value={siteConfig.footer?.helpfulLinksTitle || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            footer: { ...siteConfig.footer, helpfulLinksTitle: e.target.value }
                          })}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs"
                        />
                      </div>

                      {/* Customer Service Column Toggle */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-slate-800">عمود خدمة العملاء والتواصل</span>
                          <input
                            type="checkbox"
                            checked={siteConfig.footer?.showCustomerService ?? true}
                            onChange={(e) => setSiteConfig({
                              ...siteConfig,
                              footer: { ...siteConfig.footer, showCustomerService: e.target.checked }
                            })}
                            className="accent-brand-600 w-4 h-4"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="الهاتف الموحد"
                          value={siteConfig.footer?.phone || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            footer: { ...siteConfig.footer, phone: e.target.value }
                          })}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                        />
                      </div>

                      {/* Social Links Column Toggle */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-slate-800">عمود مواقع التواصل الاجتماعي</span>
                          <input
                            type="checkbox"
                            checked={siteConfig.footer?.showSocialLinks ?? true}
                            onChange={(e) => setSiteConfig({
                              ...siteConfig,
                              footer: { ...siteConfig.footer, showSocialLinks: e.target.checked }
                            })}
                            className="accent-brand-600 w-4 h-4"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="رابط الانستغرام"
                          value={siteConfig.footer?.instagramUrl || ''}
                          onChange={(e) => setSiteConfig({
                            ...siteConfig,
                            footer: { ...siteConfig.footer, instagramUrl: e.target.value }
                          })}
                          className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs font-mono"
                        />
                      </div>

                    </div>
                  </div>

                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl my-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">

              {/* SKU — auto-generated display only */}
              {editingProduct ? (
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold mb-0.5">رمز المنتج (SKU) — تم التعيين تلقائياً</p>
                    <p className="font-mono font-extrabold text-brand-700 text-sm tracking-widest">{editingProduct.sku}</p>
                  </div>
                  <span className="mr-auto text-[10px] bg-slate-200 text-slate-500 px-2 py-1 rounded-lg">لا يمكن تعديله</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800">
                  <span className="text-lg">✦</span>
                  <p className="text-[11px] font-bold">سيتم تعيين رمز SKU فريد تلقائياً من النظام عند الحفظ (مثال: SHT-202608-A4F2C)</p>
                </div>
              )}

              {/* Product Name & Is Coming Soon Toggle */}
              <div className="space-y-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم المنتج *</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
                
                <label className="flex items-center gap-2 p-2 bg-purple-50 rounded-xl border border-purple-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsComingSoon}
                    onChange={(e) => setProdIsComingSoon(e.target.checked)}
                    className="accent-purple-600 w-4 h-4"
                  />
                  <span className="font-bold text-purple-900 text-xs">منتج قادم قريباً (أضف هذا المنتج لقسم "قريباً في صحتين")</span>
                </label>
              </div>

              {/* Category + Prices row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">التصنيف *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold"
                  >
                    <option value="individuals">الأفراد والعائلات</option>
                    <option value="business">الأعمال والضيافة</option>
                    <option value="charity">سقيا الخير</option>
                    <option value="general">عام</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">المخزون *</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر الأصلي *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السعر بعد الخصم</label>
                  <input
                    type="number"
                    step="0.01"
                    value={prodDiscountPrice}
                    onChange={(e) => setProdDiscountPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الحجم *</label>
                  <input
                    type="text"
                    value={prodVolume}
                    onChange={(e) => setProdVolume(e.target.value)}
                    required
                    placeholder="500 مل"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">عدد العبوات في الكرتون *</label>
                <input
                  type="number"
                  value={prodPkgQty}
                  onChange={(e) => setProdPkgQty(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">الوصف *</label>
                <textarea
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 resize-none"
                />
              </div>

              {/* ── Media Mode Selector ── */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <label className="block font-extrabold text-slate-800 text-sm">نوع الوسائط المرفقة بالمنتج</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { value: 'single_image',  label: 'صورة واحدة فقط',              icon: '🖼️',  desc: 'صورة ثابتة واحدة للمنتج' },
                    { value: 'loop_images',   label: 'عدة صور تتكرر (كاروسيل)',    icon: '🎠',  desc: 'رفع عدة صور تعرض بالتناوب' },
                    { value: 'single_video',  label: 'فيديو واحد فقط',              icon: '🎬',  desc: 'فيديو يشغّل ويتكرر تلقائياً' },
                    { value: 'two_videos',    label: 'فيديو مقدمة + فيديو رئيسي',  icon: '🎥',  desc: 'فيديو مقدمة (مرة واحدة) ثم فيديو رئيسي يتكرر' },
                    { value: 'loop_videos',   label: 'عدة فيديوهات تتكرر',          icon: '📽️',  desc: 'عدة فيديوهات في كاروسيل متكرر' },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                        prodMediaMode === opt.value
                          ? 'border-brand-500 bg-brand-50 text-brand-800'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mediaMode"
                        value={opt.value}
                        checked={prodMediaMode === opt.value}
                        onChange={() => setProdMediaMode(opt.value)}
                        className="mt-0.5 accent-brand-600"
                      />
                      <div>
                        <p className="font-bold text-xs">{opt.icon} {opt.label}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Dynamic Uploader based on selected mode */}
                <div className="mt-3 space-y-4 bg-slate-50 rounded-2xl p-4 border border-slate-200">

                  {/* single_image */}
                  {prodMediaMode === 'single_image' && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">📤 رفع صورة واحدة</label>
                      <input type="file" accept="image/*" onChange={(e) => handleImageFiles(e, false)} className="w-full text-xs" />
                      {prodImagePreviews[0] && (
                        <div className="mt-3 relative inline-block">
                          <img src={prodImagePreviews[0]} alt="preview" className="w-28 h-28 object-cover rounded-xl border border-slate-200 shadow" />
                          <button type="button" onClick={() => removeImage(0)} className="absolute -top-2 -left-2 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">✕</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* loop_images */}
                  {prodMediaMode === 'loop_images' && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">📤 رفع عدة صور (يمكنك رفع أكثر من مرة)</label>
                      <input type="file" accept="image/*" multiple onChange={(e) => handleImageFiles(e, true)} className="w-full text-xs" />
                      {prodImagePreviews.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {prodImagePreviews.map((src, idx) => (
                            <div key={idx} className="relative">
                              <img src={src} alt="" className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow" />
                              <button type="button" onClick={() => removeImage(idx)} className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">✕</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* single_video */}
                  {prodMediaMode === 'single_video' && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">📤 رفع فيديو واحد</label>
                      <input type="file" accept="video/*" onChange={(e) => handleVideoFiles(e, false)} className="w-full text-xs" />
                      {prodVideoPreviews[0] && (
                        <div className="mt-3 relative inline-block">
                          <video src={prodVideoPreviews[0]} controls className="w-48 h-28 object-cover rounded-xl border border-slate-200 shadow" />
                          <button type="button" onClick={() => removeVideo(0)} className="absolute -top-2 -left-2 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">✕</button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* loop_videos */}
                  {prodMediaMode === 'loop_videos' && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-2">📤 رفع عدة فيديوهات</label>
                      <input type="file" accept="video/*" multiple onChange={(e) => handleVideoFiles(e, true)} className="w-full text-xs" />
                      {prodVideoPreviews.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-3">
                          {prodVideoPreviews.map((src, idx) => (
                            <div key={idx} className="relative">
                              <video src={src} controls className="w-40 h-24 object-cover rounded-xl border border-slate-200 shadow" />
                              <button type="button" onClick={() => removeVideo(idx)} className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">✕</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* two_videos */}
                  {prodMediaMode === 'two_videos' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">🎬 فيديو المقدمة (يُشغَّل مرة واحدة فقط)</label>
                        <input type="file" accept="video/*" onChange={handleIntroVideoFile} className="w-full text-xs" />
                        {prodIntroPreviews && (
                          <div className="mt-2 relative inline-block">
                            <video src={prodIntroPreviews} controls className="w-48 h-28 object-cover rounded-xl border border-slate-200 shadow" />
                            <button type="button" onClick={() => { setProdIntroVideo(null); setProdIntroPreviews(null); }} className="absolute -top-2 -left-2 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">✕</button>
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">🔁 الفيديو الرئيسي (يتكرر تلقائياً بعد المقدمة)</label>
                        <input type="file" accept="video/*" onChange={(e) => handleVideoFiles(e, false)} className="w-full text-xs" />
                        {prodVideoPreviews[0] && (
                          <div className="mt-2 relative inline-block">
                            <video src={prodVideoPreviews[0]} controls className="w-48 h-28 object-cover rounded-xl border border-slate-200 shadow" />
                            <button type="button" onClick={() => removeVideo(0)} className="absolute -top-2 -left-2 bg-rose-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">✕</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isUploadingMedia}
                  className="flex-grow bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {isUploadingMedia && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {isUploadingMedia ? 'جاري الرفع والحفظ...' : 'حفظ المنتج'}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsProductModalOpen(false); resetProductForm(); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl font-bold"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
