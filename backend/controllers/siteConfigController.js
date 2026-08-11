import SiteConfig from '../models/SiteConfig.js';

export const getSiteConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({});
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: error.message || 'فشل تحميل إعدادات الموقع' });
  }
};

export const updateSiteConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) {
      config = new SiteConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }
    const updated = await config.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'فشل حفظ إعدادات الموقع' });
  }
};
