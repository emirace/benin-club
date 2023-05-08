import { NextApiRequest, NextApiResponse } from 'next';
import Vehicle from '@/models/vehicle.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  const { user } = session;

  if (user.role !== 'admin' && user.role !== 'user') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectDB();
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
