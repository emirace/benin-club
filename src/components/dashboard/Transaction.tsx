import React, { useState } from 'react';

interface TransactionProps {
  transactions: Array<{
    id: number;
    date: string;
    description: string;
    category: string;
    amount: number;
  }>;
}

function Transaction(props: TransactionProps): JSX.Element {
  const { transactions } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  // Filtering transactions based on search query
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredTransactions.length / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transactions</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id} className="bg-white">
              <td className="px-4 py-2">{transaction.date}</td>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.category}</td>
              <td className="px-4 py-2">{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 px-3 py-2 rounded-md ${
              currentPage === number
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500'
            }`}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Transaction;
