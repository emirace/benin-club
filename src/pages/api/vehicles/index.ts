import Vehicle, { IVehicle } from '@/models/vehicle.model';
import { connectDB } from '@/utils/mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
import getNextVehicleId from '@/utils/utils';
import { stringify } from 'querystring';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  // const session = await getServerSession({ authOptions });

  // if (!session) {
  //   res.status(401).json({ message: 'Unauthorized' });
  //   return;
  // }

  switch (req.method) {
    case 'GET':
      try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });
        res.status(200).json(vehicles);
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
