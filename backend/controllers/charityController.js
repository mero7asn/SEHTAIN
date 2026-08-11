import CharityRequest from '../models/CharityRequest.js';

export const createCharityRequest = async (req, res) => {
  try {
    const { organizationName, organizationType, location, beneficiaries, quantity, phone, notes } = req.body;

    if (!organizationName || !organizationType || !location || !beneficiaries || !quantity || !phone) {
      return res.status(400).json({ message: 'يرجى ملء جميع الحقول الإلزامية' });
    }

    const charityReq = new CharityRequest({
      organizationName,
      organizationType,
      location,
      beneficiaries,
      quantity,
      phone,
      notes,
      status: 'جديد'
    });

    const savedReq = await charityReq.save();
    res.status(201).json({ message: 'تم استلام طلب السقيا بنجاح، ونسأل الله أن يجعلها في ميزان حسناتكم', data: savedReq });
  } catch (error) {
    res.status(500).json({ message: error.message || 'حدث خطأ أثناء إرسال طلب السقيا' });
  }
};

export const getCharityRequests = async (req, res) => {
  try {
    const requests = await CharityRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCharityStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reqItem = await CharityRequest.findById(req.params.id);
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
