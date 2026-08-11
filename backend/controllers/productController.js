import Product from '../models/Product.js';

// Generate a unique SKU: SHT-YYYYMM-XXXXX
const generateUniqueSku = async () => {
  const now = new Date();
  const prefix = `SHT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-`;
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let sku, exists;
  do {
    const suffix = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    sku = `${prefix}${suffix}`;
    exists = await Product.findOne({ sku });
  } while (exists);
  return sku;
};

export const getProducts = async (req, res) => {
  try {
    const { category, search, active } = req.query;
    let query = {};

    if (category && category !== 'all' && category !== 'الكل') {
      query.category = category;
    }

    if (active !== undefined) {
      query.active = active === 'true';
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { sku: searchRegex },
        { volume: searchRegex }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message || 'حدث خطأ في تحميل المنتجات' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'المنتج غير موجود' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name, description, price, discountPrice,
      category, volume, packageQuantity, weight, stock,
      mediaMode, images, videos, introVideo, isComingSoon, active
    } = req.body;

    // Auto-generate unique SKU — never taken from request body
    const sku = await generateUniqueSku();

    const slug = name.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)/g, '') || `product-${Date.now()}`;

    const product = new Product({
      name,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      description,
      price,
      discountPrice: discountPrice || 0,
      sku,
      category: category || 'general',
      volume,
      packageQuantity,
      weight: weight || '',
      stock: stock !== undefined ? stock : 100,
      mediaMode: mediaMode || 'single_image',
      images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80'],
      videos: videos || [],
      introVideo: introVideo || '',
      isComingSoon: isComingSoon !== undefined ? isComingSoon : false,
      active: active !== undefined ? active : true
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'فشل في إنشاء المنتج' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }

    // SKU is never updated after creation
    const fields = [
      'name', 'description', 'price', 'discountPrice',
      'category', 'volume', 'packageQuantity', 'weight', 'stock',
      'mediaMode', 'images', 'videos', 'introVideo', 'isComingSoon', 'active'
    ];
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'فشل في تحديث المنتج' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'المنتج غير موجود' });
    }
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
