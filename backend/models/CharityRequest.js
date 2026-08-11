import mongoose from 'mongoose';

const charityRequestSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true },
  location: { type: String, required: true },
  beneficiaries: { type: Number, required: true },
  quantity: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['جديد', 'قيد المعالجة', 'قيد التقييم', 'تم التوفير', 'مرفوض', 'ملغي'], 
    default: 'جديد' 
  }
}, {
  timestamps: true
});

const CharityRequest = mongoose.model('CharityRequest', charityRequestSchema);
export default CharityRequest;
