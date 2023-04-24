import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IWalletTransaction } from '@/models/walletTransaction.model';

interface TransactionProps {
  transactions: IWalletTransaction[];
}

function Transaction(props: TransactionProps): JSX.Element {
  const { transactions } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: '',
    status: '',
  });

  // Filtering transactions based on search query
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Sorting transactions based on sortConfig
  const sortedTransactions = [...currentTransactions];
  if (sortConfig.key) {
    sortedTransactions.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      if (sortConfig.key === 'status') {
        switch (a.status) {
          case 'Completed':
            return sortConfig.direction === 'asc' ? -1 : 1;
          case 'Pending':
            return sortConfig.direction === 'asc' ? -1 : 1;
          case 'Failed':
            return sortConfig.direction === 'asc' ? -1 : 1;
          default:
            return 0;
        }
      }
      return 0;
    });
  }

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

  const handleSort = (key: string, defaultDirection: string = 'asc') => {
    let direction = defaultDirection;
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction, status: sortConfig.status });
  };

  const renderSortArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼';
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transactions</h3>
        <button className="px-3 py-2 bg-red text-white rounded-md hover:bg-white hover:text-red focus:outline-none focus:ring-2 focus:ring-red focus:ring-offset-2">
          Add Transaction
        </button>
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

      <table className="w-full whitespace-nowrap">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort('invoiceId', 'asc')}
            >
              Invoice ID {renderSortArrow('invoiceId')}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort('memberName', 'asc')}
            >
              Member Name {renderSortArrow('memberName')}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort('date', 'asc')}
            >
              Date {renderSortArrow('date')}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort('description', 'asc')}
            >
              Description {renderSortArrow('description')}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort('paymentMethod', 'asc')}
            >
              Payment Method {renderSortArrow('paymentMethod')}
            </th>
            <th
              className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer"
              onClick={() => handleSort('amount', 'asc')}
            >
              Amount {renderSortArrow('amount')}
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider cursor-pointer">
              Status
              <select
                className="ml-2 border border-gray-400 rounded-md py-1 px-2 text-sm"
                onChange={(e) =>
                  setSortConfig({
                    key: 'status',
                    direction: sortConfig.direction,
                    status: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </th>
            <th className="px-4 py-2 text-left font capitalize text-sm  tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.id} className="bg-white">
              <td className="px-4 py-2">{transaction.invoiceId}</td>
              <td className="px-4 py-2">{transaction.memberName}</td>
              <td className="px-4 py-2">{transaction.createdAt}</td>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.paymentMethod}</td>
              <td className="px-4 py-2">{transaction.amount}</td>{' '}
              <td
                className={`px-4 py-2 ${
                  transaction.status === 'Completed'
                    ? 'text-green'
                    : transaction.status === 'Pending'
                    ? 'text-yellow'
                    : 'text-red'
                }`}
              >
                {transaction.status}
              </td>
              <td className="px-4 py-2">
                <button className="mr-2  hover:text-yellow focus:outline-none">
                  <FaEdit />
                </button>
                <button className="text-red hover:text-red-700 focus:outline-none">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 px-3 py-2 rounded-md ${
              currentPage === number ? 'bg-red text-white' : 'bg-white text-red'
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
