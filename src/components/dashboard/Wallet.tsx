import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import Loading from '../Loading';
import WalletRow from './WalletRow';
import { buttonStyle } from '@/constants/styles';
import Modal from '../Modal';
import CreateWallet from './wallet/CreateWallet';

export type WalletDataProps = {
  _id: string;
  balance: number;
  userId: {
    _id: string;
    firstName: string;
    surName: string;
  };
};

const Wallet = () => {
  const [walletData, setWalletData] = useState<WalletDataProps[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetchWalletData();
  }, [currentPage, pageSize]);

  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard/wallets?page=${currentPage}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch wallet data.');
      }
      const { wallets, totalWallets } = await response.json();
      setWalletData(wallets);
      setTotalPages(Math.ceil(totalWallets / pageSize));
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateWalletTable = () => {
    fetchWalletData();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateWalletTable();
  };

  const onOpen = () => {
    console.log('hello');
    setShowModal(true); // <-- update state variable to show modal
  };

  const filteredWalletData = walletData.filter(
    (member) =>
      member.userId?.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      member.userId?.surName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center w-64 relative border border-gray rounded-md">
          <span className="absolute pl-3 inset-y-0 left-0 flex items-center">
            <FiSearch className="text-red" />
          </span>
          <input
            className="py-2 pl-10 pr-4 w-full rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button className={buttonStyle} onClick={onOpen}>
          Create
        </button>
      </div>

      <Modal isOpen={showModal} onClose={onClose}>
        <CreateWallet onClose={onClose} />
      </Modal>
      {error && <div className="text-red"> {error}</div>}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : walletData.length === 0 ? (
        <div>No data found.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr className="v">
                <th className="py-2 px-4 text-left">Member Name</th>
                <th className="py-2 px-4 text-left">Wallet Balance</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredWalletData.map((member) => (
                <WalletRow
                  handleUpdateWalletTable={handleUpdateWalletTable}
                  member={member}
                  key={member._id}
                />
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center">
                <button
                  className={`px-3 py-1 rounded-full ${
                    currentPage === 1
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={`mx-2 px-3 py-1 rounded-full ${
                        pageNumber === currentPage
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-gray-200 hover:bg-gray-400'
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  className={`px-3 py-1 rounded-full ${
                    currentPage === totalPages
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Wallet;
