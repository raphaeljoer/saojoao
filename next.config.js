/** @type {import('next').NextConfig} */

const mongodb = {
  SM_MONGODB_URI: process.env.SM_MONGODB_URI,
  SM_MONGODB_DB_NAME: process.env.SM_MONGODB_DB_NAME,
  SM_MONGODB_COLLECTION: process.env.SM_MONGODB_COLLECTION
};

const recaptchaV2 = {
  SM_RECAPTCHA_V2_SITE_KEY: process.env.SM_RECAPTCHA_V2_SITE_KEY,
  SM_RECAPTCHA_V2_SECRET_KEY: process.env.SM_RECAPTCHA_V2_SECRET_KEY
};

const recaptchaV3 = {
  SM_RECAPTCHA_V3_SITE_KEY: process.env.SM_RECAPTCHA_V3_SITE_KEY,
  SM_RECAPTCHA_V3_SECRET_KEY: process.env.SM_RECAPTCHA_V3_SECRET_KEY,
  SM_RECAPTCHA_V3_MIN_SCORE: process.env.SM_RECAPTCHA_V3_MIN_SCORE
};

const tagManager = {
  SM_GOOGLE_ANALYTICS_ID: process.env.SM_GOOGLE_ANALYTICS_ID,
  SM_GOOGLE_TAG_MANAGER_ID: process.env.SM_GOOGLE_TAG_MANAGER_ID,
};

const metaTags = {
  SM_META_TAG_TITLE: process.env.SM_META_TAG_TITLE,
  SM_META_TAG_DESCRIPTION: process.env.SM_META_TAG_DESCRIPTION,
  SM_META_TAG_URL: process.env.SM_META_TAG_URL
};

const dates = {
  NEXT_PUBLIC_VOTING_DATE_START: process.env.NEXT_PUBLIC_VOTING_DATE_START,
  NEXT_PUBLIC_VOTING_DATE_END: process.env.NEXT_PUBLIC_VOTING_DATE_END,
};

const security = {
  NEXT_PUBLIC_SM_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_SM_GOOGLE_TAG_MANAGER_ID,
};

const env = {
  ...security,
  ...dates,
  ...metaTags,
  ...mongodb,
  ...recaptchaV2,
  ...recaptchaV3,
  ...tagManager
};

const images = {
  path: '/_next/image',
  loader: 'default',
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  domains: ['images.suamusica.com.br', 'source.unsplash.com', 'github.com']
};

const nextConfig = {
  env,
  images
}

module.exports = nextConfig;