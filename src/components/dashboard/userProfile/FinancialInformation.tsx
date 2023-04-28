import Loading from '@/components/Loading';
import { IUser } from '@/models/user.model';
import { IWallet } from '@/models/wallet.model';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { FaWallet, FaUniversity, FaEdit, FaCheck } from 'react-icons/fa';

interface IFinancialInformationProps {
  user: IUser;
}

const FinancialInformation: React.FC<IFinancialInformationProps> = ({
  user,
}) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-red text-xl mb-4">Financial Information</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Subscription Fee
          </label>
          <Input value={user.subcriptionFee} property="subcriptionFee" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Subscription Balance
          </label>
          <Input value={user.subcriptionBal} property="subcriptionBal" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Entry Fee Payment
          </label>
          <Input value={user.entryFeePayment} property="entryFeePayment" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Entry Fee Balance
          </label>
          <Input value={user.entryFeeBal} property="entryFeeBal" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Wallet Balance
          </label>
          <div className="flex items-center">
            <FaWallet className="mr-2" />
            <p className="text-gray-700">&#x20a6;{user?.wallet?.balance}</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Bank Account Information
          </label>
          <div className="flex items-center">
            <FaUniversity className="mr-2" />
            <p className="text-gray-700">{user.nameOfBankers || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialInformation;

interface Props {
  value: number;
}
interface Props {
  value: number;
  property: string;
}

const Input = ({ value, property }: Props) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCheckClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [property]: inputValue, // use dynamic key here
        }),
      });
      const data = await response.json();
      console.log(data);
      setEditing(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError('Error updating value, try again');
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      {editing ? (
        <div>
          <div className="flex items-center">
            <input
              className="mt-1 block w-full rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              type="number"
              name={property}
              onChange={(e) => setInputValue(parseInt(e.target.value))}
              value={inputValue || ''}
            />
            {loading ? (
              <Loading />
            ) : (
              <FaCheck
                className="bg-red text-white rounded-md ml-2 h-10 w-10 p-2 cursor-pointer"
                onClick={handleCheckClick}
              />
            )}
          </div>
          {error && <div className="text-red">{error}</div>}
        </div>
      ) : (
        <div className="w-full flex justify-between items-center">
          <p className="text-gray-700">&#x20a6;{value || 0}</p>
          <FaEdit
            className="hover:text-red cursor-pointer"
            onClick={handleEditClick}
          />
        </div>
      )}
    </div>
  );
};
