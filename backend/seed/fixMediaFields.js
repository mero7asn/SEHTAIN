import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import mongoose from 'mongoose';

dotenv.config();

const fix = async () => {
  await connectDB();
  const db = mongoose.connection.db;

  // Fix SiteConfig: ensure videos and images are always arrays
  const configs = await db.collection('siteconfigs').find({}).toArray();
  for (const cfg of configs) {
    const update = {};
    for (const section of ['mainHero', 'comingSoonHero']) {
      if (cfg[section]) {
        if (typeof cfg[section].videos === 'string') {
          update[`${section}.videos`] = cfg[section].videos ? [cfg[section].videos] : [];
        }
        if (typeof cfg[section].images === 'string') {
          update[`${section}.images`] = cfg[section].images ? [cfg[section].images] : [];
        }
      }
    }
    if (Object.keys(update).length > 0) {
      await db.collection('siteconfigs').updateOne({ _id: cfg._id }, { $set: update });
      console.log('Fixed siteconfig:', cfg._id, update);
    }
  }

  console.log('Done fixing media fields.');
  process.exit(0);
};

fix().catch(e => { console.error(e); process.exit(1); });
