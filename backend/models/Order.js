import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  volume: { type: String },
  packageQuantity: { type: Number },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true }, // e.g. SH-100245
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  vat: { type: Number, required: true },
  deliveryFee: { type: Number, required: true, default: 10 },
  total: { type: Number, required: true },
  shippingAddress: {
    city: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
    building: String,
    apartment: String,
    notes: String
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['cod', 'card', 'applepay'],
    default: 'cod' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'],
    default: 'pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['جديد', 'قيد المعالجة', 'قيد التجهيز', 'خرج للتوصيل', 'تم التوصيل', 'ملغي'],
    default: 'جديد'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
