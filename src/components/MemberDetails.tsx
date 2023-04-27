import { Membership } from '@/types/membership';
import { FaCreditCard, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { IUser } from '@/models/user.model';

interface MemberDetailsProps {
  membership: Membership;
  user: IUser;
}

const MemberDetails: React.FC<MemberDetailsProps> = ({ membership, user }) => {
  console.log(user);
  const formattedJoinDate = moment(user.joinDate).format('MMM DD, YYYY');
  const formattedRenewalDate = moment(membership.renewalDate).format(
    'MMM DD, YYYY'
  );

  return (
    <div className="flex flex-col border-t border-gray pt-8">
      <h2 className="text-lg font-medium mb-4">Member Details</h2>
      <div className="flex items-center mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            membership.status === 'Active' ? 'bg-green' : 'bg-red'
          } mr-2`}
        ></div>
        <p>{user.status} Member</p>
      </div>
      <div className="flex items-center mb-4">
        <FaRegCalendarAlt className="mr-2" />
        <p>Joined on {formattedJoinDate}</p>
      </div>
      <div className="flex items-center mb-4">
        <FaRegCalendarAlt className="mr-2" />
        <p>Renewal Date: {formattedRenewalDate}</p>
      </div>
      <div className="flex items-center mb-4">
        <FaCreditCard className="mr-2" />
        <p>Payment Information: {membership.paymentInfo}</p>
      </div>
      <div className="flex items-center mb-4">
        <p>Membership Level: {user.level}</p>
      </div>
    </div>
  );
};

export default MemberDetails;
