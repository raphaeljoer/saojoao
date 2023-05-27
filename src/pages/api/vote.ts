import { coreServer } from '@/core/main-server';
import { NextApiHandler } from 'next/types';

export const vote: NextApiHandler = async (req, res) => {
  const artistId = req?.body?.artistId;
  const votedAt = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''; //prettier-ignore

  const result = await coreServer.vote.addVote({
    vote: { artistId, votedAt, ip },
    recaptchaTokenV2: req?.body?.recaptchaTokenV2,
    recaptchaTokenV3: req?.body?.recaptchaTokenV3
  });

  if (result.isFailure()) {
    return res.status(400).json({ error: result.value.error });
  }

  return res.status(200).json({ message: 'Vote added successfully' });
};

export default vote;
