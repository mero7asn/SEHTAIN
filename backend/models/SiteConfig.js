import mongoose from 'mongoose';

const siteConfigSchema = new mongoose.Schema({
  // Main Hero Section
  mainHero: {
    badge: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    ctaText: { type: String, default: '' },
    ctaLink: { type: String, default: '/products' },
    mediaMode: {
      type: String,
      enum: ['single_image', 'two_videos', 'single_video', 'loop_videos', 'loop_images'],
      default: 'single_image'
    },
    images: [{ type: String }],
    videos: [{ type: String }],
    introVideo: { type: String }
  },

  // Products Section Header
  productsSection: {
    badge: { type: String, default: 'تشكيلتنا المختارة' },
    title: { type: String, default: 'منتجاتنا الحالية' },
    line1: { type: String, default: 'اختر الحجم المناسب لاحتياجك اليومي من عبوات مياه صحتين المتميزة.' },
    line2: { type: String, default: 'نضمن لك توصيلاً سريعاً ومبرداً حتى باب منزلك أو منشأتك.' }
  },

  // Coming Soon Hero Section
  comingSoonHero: {
    enabled: { type: Boolean, default: true },
    badge: { type: String, default: 'قريباً جداً' },
    title: { type: String, default: 'ابتكارات جديدة في عالم المياه' },
    description: { type: String, default: 'نعمل على تطوير منتجات وأحجام جديدة تلبي أرقى معايير الاستدامة والنقاء. انتظرونا قريباً في الأسواق.' },
    mediaMode: {
      type: String,
      enum: ['single_image', 'two_videos', 'single_video', 'loop_videos', 'loop_images'],
      default: 'single_image'
    },
    images: [{ type: String }],
    videos: [{ type: String }],
    introVideo: { type: String }
  },

  // Coming Soon Products Section
  comingSoonProductsSection: {
    enabled: { type: Boolean, default: true },
    badge: { type: String, default: 'منتجات قادمة' },
    title: { type: String, default: 'قريباً في صحتين' },
    line1: { type: String, default: 'تشكيلة حصريّة جاري تجهيزها لتنضم إلى عائلة منتجاتنا في القريب العاجل.' },
    line2: { type: String, default: 'يمكنك الاطلاع على المواصفات والاشتراك في قائمة الانتظار للطلب المسبق.' }
  },

  // Our Partners Section
  partnersSection: {
    enabled: { type: Boolean, default: true },
    title: { type: String, default: 'شركاء النجاح' },
    description: { type: String, default: 'نفخر بثقة كبرى المؤسسات، الفنادق، والجهات الخيرية في جميع أنحاء المملكة.' },
    partners: [{
      name: { type: String },
      logo: { type: String }
    }]
  },

  // Footer Control & Customization
  footer: {
    showBrandInfo: { type: Boolean, default: true },
    brandBio: { type: String, default: 'شركة صحتين للمياه التعبئة الحديثة. نقدم مياه نقية عالية الجودة معبأة بأحدث التقنيات.' },
    taxNumber: { type: String, default: '300123456700003' },

    showHelpfulLinks: { type: Boolean, default: true },
    helpfulLinksTitle: { type: String, default: 'روابط تهمك' },

    showCustomerService: { type: Boolean, default: true },
    customerServiceTitle: { type: String, default: 'خدمة العملاء' },
    phone: { type: String, default: '920000000' },
    email: { type: String, default: 'care@sahtain.demo' },
    address: { type: String, default: 'المملكة العربية السعودية، الرياض، المنطقة الصناعية' },

    showSocialLinks: { type: Boolean, default: true },
    socialTitle: { type: String, default: 'تابعنا' },
    instagramUrl: { type: String, default: '#' },
    twitterUrl: { type: String, default: '#' },
    whatsappUrl: { type: String, default: '#' },

    showBottomBar: { type: Boolean, default: true },
    copyrightText: { type: String, default: 'مياه صحتين. جميع الحقوق محفوظة (تطبيق تجريبي للاختبار والتعلم).' }
  }
}, {
  timestamps: true
});

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
export default SiteConfig;
