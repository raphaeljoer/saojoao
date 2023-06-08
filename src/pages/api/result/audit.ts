import { coreServer } from '@/core/main-server';
import { getServerSession } from 'next-auth';
import { NextApiHandler } from 'next/types';
import { authOptions } from '../auth/[...nextauth]';

export const audit: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const users = process.env.SM_USERS_LIST?.split(',') || [];

  if (!users.includes(session?.user?.email || '')) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const result = await coreServer.vote.getAuditResult();

  if (result.isFailure()) {
    return res.status(400).json(result.value);
  }

  return res.status(200).json(result.value);
};

export default audit;
