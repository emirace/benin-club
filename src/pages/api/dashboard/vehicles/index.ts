import Vehicle, { IVehicle } from '@/models/vehicle.model';
import { connectDB } from '@/utils/mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import getNextVehicleId from '@/utils/utils';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

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

  switch (req.method) {
    case 'GET':
      try {
        const { page, limit } = req.query;
        const pageNumber = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.limit as string) || 24;
        const skip = (pageNumber - 1) * pageSize;

        const totalVehicles = await Vehicle.countDocuments();
        const totalPages = Math.ceil(totalVehicles / pageSize);

        const vehicles = await Vehicle.find().skip(skip).limit(pageSize);

        res.status(200).json({ vehicles, total: totalVehicles, totalPages });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    case 'POST':
      try {
        const {
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          qrCodeUrl,
        } = req.body;
        const vehicleId = await getNextVehicleId();
        const vehicle: IVehicle = new Vehicle({
          vehicleId,
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          qrCodeUrl,
        });

        const savedVehicle = await vehicle.save();

        res.status(201).json(savedVehicle);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
