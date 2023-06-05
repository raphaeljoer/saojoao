import { coreServer } from '@/core/main-server';
import { NextApiHandler } from 'next/types';

export const partial: NextApiHandler = async (_, res) => {
  const result = await coreServer.vote.getResult();

  if (result.isFailure()) {
    return res.status(400).json(result.value);
  }

  return res.status(200).json(result.value);
};

export default partial;
