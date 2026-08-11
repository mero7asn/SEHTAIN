import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import B2BRequest from '../models/B2BRequest.js';
import CharityRequest from '../models/CharityRequest.js';
import Review from '../models/Review.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalSalesAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'ملغي' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalSales = totalSalesAgg.length > 0 ? totalSalesAgg[0].total : 0;

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const pendingOrders = await Order.countDocuments({ orderStatus: { $in: ['جديد', 'قيد المعالجة', 'قيد التجهيز'] } });
    const totalB2B = await B2BRequest.countDocuments();
    const totalCharity = await CharityRequest.countDocuments();
    const totalReviews = await Review.countDocuments();

    const recentOrders = await Order.find().sort({ orderNumber: -1 }).limit(10);

    res.json({
      totalSales,
      totalOrders,
      totalProducts,
      totalCustomers,
      pendingOrders,
      totalB2B,
      totalCharity,
      totalReviews,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
