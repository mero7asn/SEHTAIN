import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, default: 0 },
  sku: { type: String, required: true, unique: true, uppercase: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['individuals', 'business', 'charity', 'general'],
    default: 'general'
  },
  volume: { type: String, required: true },
  packageQuantity: { type: Number, required: true },
  weight: { type: String },
  stock: { type: Number, required: true, default: 100, min: 0 },

  // Media Mode — controls how media is displayed on product cards/pages
  // single_image  : one image only
  // two_videos    : introVideo plays once, then videos[0] loops
  // single_video  : videos[0] plays and loops
  // loop_videos   : all videos in videos[] loop in a carousel
  // loop_images   : all images in images[] loop in a carousel
  mediaMode: {
    type: String,
    enum: ['single_image', 'two_videos', 'single_video', 'loop_videos', 'loop_images'],
    default: 'single_image'
  },

  images: [{ type: String }],     // image URLs / paths
  videos: [{ type: String }],     // video URLs / paths
  introVideo: { type: String },   // one-time intro video (used in two_videos mode)

  isComingSoon: { type: Boolean, default: false },

  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
