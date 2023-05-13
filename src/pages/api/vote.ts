import { coreServer } from '@/core/main-server';
import { NextApiHandler } from 'next/types';

export const vote: NextApiHandler = async (req, res) => {
  await coreServer.vote.addVote(req, res);
};

export default vote;
