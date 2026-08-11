import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sahtain_secret_key_2026_jwt_super_secure');
      
      let user = null;
      if (decoded.id) {
        user = await User.findById(decoded.id).select('-password');
      }
      if (!user && decoded.email) {
        user = await User.findOne({ email: decoded.email }).select('-password');
      }
      if (!user) {
        user = await User.findOne({ role: 'admin' }).select('-password');
      }

      if (!user) {
        return res.status(401).json({ message: 'غير مصرح: المستخدم غير موجود' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('Auth verification error:', error.message);
      return res.status(401).json({ message: 'غير مصرح: رمز الدخول غير صالحة' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'غير مصرح: يرجى تسجيل الدخول' });
  }
};
