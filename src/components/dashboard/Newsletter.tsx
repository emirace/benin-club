import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import Loading from "../Loading";
import WalletRow from "./WalletRow";
import { buttonStyle } from "@/constants/styles";
import Modal from "../Modal";
import NewsletterRow from "./NewsletterRow";

export type NewsletterDataProps = {
  _id: string;
  email: string;
  isMember: boolean;
  createdAt: string;
};
type FetchNewsletterDataProps = {
  query: string;
  page: number;
};

const Newsletter = () => {
  const [newsletterData, setNewsletterData] = useState<NewsletterDataProps[]>(
    []
  );
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchNewsletterData = useCallback(
    async ({ query, page }: FetchNewsletterDataProps) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/dashboard/newsletter?page=${page}&pageSize=${pageSize}&search=${query}`
        );
        if (!response.ok) {
          throw new Error("Unable to fetch newsletter data.");
        }
        const newsletter = await response.json();
        console.log(newsletter);
        setNewsletterData(newsletter);
        setTotalPages(Math.ceil(newsletter.length / pageSize));
      } catch (error: any) {
        setError(error.message);
        console.log(error);
      }
      setIsLoading(false);
    },
    [pageSize]
  );

  useEffect(() => {
    fetchNewsletterData({ query: "", page: currentPage });
  }, [currentPage, fetchNewsletterData, pageSize]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleUpdateNewsletterTable = () => {
    fetchNewsletterData({ query: "", page: currentPage });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    fetchNewsletterData({ query: searchTerm, page: 1 });
  };

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateNewsletterTable();
  };

  const onOpen = () => {
    setShowModal(true); // <-- update state variable to show modal
  };

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
            onChange={handleSearch}
          />
        </div>
        <button className={buttonStyle} onClick={onOpen}>
          Create
        </button>
      </div>

      <Modal isOpen={showModal} onClose={onClose}>
        {/* //create newsletter */}
      </Modal>
      {error && <div className="text-red"> {error}</div>}
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : newsletterData.length === 0 ? (
        <div>No data found.</div>
      ) : (
        <>
          <table>
            <thead>
              <tr className="v">
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Reg Member</th>
                <th className="py-2 px-4 text-left">Action</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {newsletterData.map((member) => (
                <NewsletterRow
                  handleUpdateNewsletterTable={handleUpdateNewsletterTable}
                  member={member}
                  key={member._id}
                />
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center">
                {currentPage !== 1 && (
                  <button
                    className={`px-3 py-1 text-red`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    PREV
                  </button>
                )}

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={`mx-2 px-3 py-1 rounded-lg ${
                        pageNumber === currentPage
                          ? "bg-red text-white cursor-not-allowed"
                          : "text-red "
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {currentPage !== totalPages && (
                  <button
                    className={`px-3 py-1 text-red`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    NEXT
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Newsletter;
