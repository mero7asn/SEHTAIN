import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  try {
    const { name, orderNumber, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'يرجى تقديم الاسم والتقييم والتعليق' });
    }

    const review = new Review({
      user: req.user ? req.user._id : null,
      name,
      orderNumber: orderNumber || '',
      rating: Number(rating),
      comment,
      approved: true
    });

    const savedReview = await review.save();
    res.status(201).json({ message: 'شكراً لتقييمك! تم إرسال التقييم بنجاح', data: savedReview });
  } catch (error) {
    res.status(500).json({ message: error.message || 'حدث خطأ أثناء إرسال التقييم' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'التقييم غير موجود' });
    }
    review.approved = req.body.approved !== undefined ? req.body.approved : !review.approved;
    const updated = await review.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'التقييم غير موجود' });
    }
    await review.deleteOne();
    res.json({ message: 'تم حذف التقييم' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

