import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { SortOrder } from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: 'You must log in to access this resource.' });

    const { user: loginUser } = session;

    if (
      loginUser.role !== 'admin' &&
      loginUser.role !== 'user' &&
      loginUser.role !== 'wallet'
    ) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    switch (req.method) {
      case 'GET':
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;
        const skip = (page - 1) * pageSize;
        const sortField = (req.query.sort as string) || '_id';
        const sortOrder = ((req.query.order as string) || 'asc') as SortOrder;
        const sort: [string, SortOrder][] = [[sortField, sortOrder]];
        const category = (req.query.category as string) || 'all';
        const search = (req.query.search as string) || '';

        const categoryFilter = category === 'all' ? {} : { level: category };
        console.log(sortField, sortOrder, category, categoryFilter, search);

        const searchFilter =
          search === ''
            ? {}
            : {
                name: { $regex: search, $options: 'i' }, // Regular expression for matching the search query
              };

        const members: IUser[] = await User.find({
          role: 'member',
          ...categoryFilter,
          $or: [
            { surName: { $regex: search, $options: 'i' } },
            { firstName: { $regex: search, $options: 'i' } },
            { memberId: { $regex: search, $options: 'i' } },
            // { tel: { $regex: parseInt(search), $options: 'i' } },
          ],
        })
          .sort(sort)
          .skip(skip)
          .limit(pageSize);
        const totalMembers: number = await User.countDocuments({
          role: 'member',
          ...categoryFilter,
          $or: [
            { surName: { $regex: search, $options: 'i' } },
            { firstName: { $regex: search, $options: 'i' } },
            { memberId: { $regex: search, $options: 'i' } },
            // { tel: { $regex: parseInt(search), $options: 'i' } },
          ],
        });
        res.status(200).json({ members, totalMembers });

        break;

      case 'POST':
        const { memberId } = req.body;
        console.log(memberId);
        const newUser: IUser = new User({ memberId });
        await newUser.save();
        res.status(201).json(newUser);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
