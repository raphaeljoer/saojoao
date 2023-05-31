import { NextApiHandler } from 'next';

const region: NextApiHandler = async (req, res) => {
  res.statusCode = 200;
  res.json({ region: process.env.AWS_REGION || 'NOT SET' });
};

export default region;
