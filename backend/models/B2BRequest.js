import mongoose from 'mongoose';

const b2bRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  contactName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  businessType: { type: String, required: true },
  city: { type: String, required: true },
  quantity: { type: String, required: true },
  deliveryDate: { type: Date },
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['جديد', 'قيد التواصل', 'تم الاتفاق', 'تم الرفض', 'مغلق'], 
    default: 'جديد' 
  }
}, {
  timestamps: true
});

const B2BRequest = mongoose.model('B2BRequest', b2bRequestSchema);
export default B2BRequest;
