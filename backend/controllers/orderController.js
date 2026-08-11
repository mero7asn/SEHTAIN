import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, subtotal, vat, deliveryFee, total, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'السلة فارغة' });
    }

    const count = await Order.countDocuments();
    const orderNumber = `SH-${100245 + count + 1}`;

    const order = new Order({
      orderNumber,
      user: req.user ? req.user._id : null,
      customerInfo,
      items,
      subtotal,
      vat,
      deliveryFee: deliveryFee || 10,
      total,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'جديد'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || 'حدث خطأ أثناء إنشاء الطلب' });
  }
};

export const getOrders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }
    const orders = await Order.find(query).sort({ orderNumber: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || 'حدث خطأ في تحميل الطلبات' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const param = req.params.id;
    const isObjectId = param.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: param } : { orderNumber: param };
    const order = await Order.findOne(query);

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    if (req.user && req.user.role !== 'admin' && order.user && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'غير مصرح للوصول لهذا الطلب' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
