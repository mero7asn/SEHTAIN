import B2BRequest from '../models/B2BRequest.js';

export const createB2BRequest = async (req, res) => {
  try {
    const { companyName, contactName, phone, email, businessType, city, quantity, deliveryDate, notes } = req.body;

    if (!companyName || !contactName || !phone || !email || !businessType || !city || !quantity) {
      return res.status(400).json({ message: 'يرجى ملء جميع الحقول الإلزامية' });
    }

    const b2bReq = new B2BRequest({
      companyName,
      contactName,
      phone,
      email,
      businessType,
      city,
      quantity,
      deliveryDate,
      notes,
      status: 'جديد'
    });

    const savedReq = await b2bReq.save();
    res.status(201).json({ message: 'تم إرسال طلب عرض السعر بنجاح، وسيتم التواصل معكم قريباً', data: savedReq });
  } catch (error) {
    res.status(500).json({ message: error.message || 'حدث خطأ أثناء إرسال طلب B2B' });
  }
};

export const getB2BRequests = async (req, res) => {
  try {
    const requests = await B2BRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateB2BStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reqItem = await B2BRequest.findById(req.params.id);
    if (!reqItem) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }
    reqItem.status = status;
    const updated = await reqItem.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
