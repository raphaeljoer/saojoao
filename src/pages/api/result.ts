import { coreServer } from '@/core/main-server';
import { NextApiHandler } from 'next/types';

export const result: NextApiHandler = async (req, res) => {
  await coreServer.vote.getResult(req, res);
};

export default result;
