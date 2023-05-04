import { WalletDocument } from '@/models/wallet.model';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Loading from '../Loading';

const Wallet = () => {
  const [walletData, setWalletData] = useState<any>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
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
              <tr>
                <th className="py-2 px-4 text-left">Member Name</th>
                <th className="py-2 px-4 text-left">Wallet Balance</th>
              </tr>
            </thead>
            <tbody>
              {walletData.map((member: any) => (
                <tr key={member._id} className="border-t">
                  <td className="py-2 px-4">
                    {member.userId?.surName} {member.userId?.firstName}
                  </td>
                  <td className="py-2 px-4">{member.balance}</td>
                </tr>
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
