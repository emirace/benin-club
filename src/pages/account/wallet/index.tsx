import { useState } from 'react';
import Head from 'next/head';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const WalletPage = () => {
  const [balance, setBalance] = useState<number>(1000);

  const handleAddFunds = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amountInput = (event.target as HTMLFormElement).elements.namedItem(
      'amount'
    ) as HTMLInputElement | null;
    if (amountInput) {
      const amount = parseFloat(amountInput.value);
      setBalance(balance + amount);
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>My Wallet | Next.js Wallet App</title>
        </Head>

        <div className="bg-red text px-4 py-6">
          <h1 className="text-2xl font-semibold mb-2">My Wallet</h1>
          <div className="bg-white rounded-lg py-6 px-8">
            <p className="text-sm">Your current balance is</p>
            <p className="text-3xl font-bold mb-0">${balance}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-md p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Add Funds</h2>

          <form onSubmit={handleAddFunds}>
            <label htmlFor="amount" className="sr-only">
              Amount
            </label>
            <div className="flex items-center border border-gray-200 rounded-md py-2 px-3 mb-4">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                id="amount"
                className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter amount"
                required
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add Funds
              <HiOutlineArrowNarrowRight className="ml-2" />
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-md p-6 mt-4">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>

          <ul>
            <li className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex-shrink-0 mr-4"></div>
              <div>
                <p className="text-gray-500">Received $500 from John Doe</p>
                <p className="text-sm text-gray-400">2022-04-27 10:30:15 AM</p>
              </div>
              <p className="ml-auto text-green-600 font-semibold">+$500</p>
            </li>

            <li className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex-shrink-0 mr-4"></div>
              <div>
                <p className="text-gray-500">Sent $200 to Jane</p>
                <p className="text-sm text-gray-400">2022-04-26 2:15:23 PM</p>
              </div>
              <p className="ml-auto text-red-600 font-semibold">-$200</p>
            </li>
            <li className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex-shrink-0 mr-4"></div>
              <div>
                <p className="text-gray-500">Received $1000 from Acme Inc.</p>
                <p className="text-sm text-gray-400">2022-04-25 9:45:10 AM</p>
              </div>
              <p className="ml-auto text-green-600 font-semibold">+$1000</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WalletPage;
