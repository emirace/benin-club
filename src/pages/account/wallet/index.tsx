import { useState } from 'react';
import Head from 'next/head';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const WalletPage = () => {
  const [balance, setBalance] = useState<number>(1000);

  return (
    <div>
      <div className="bg-black h-24 w-full " />
      <div className="flex flex-col mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <Head>
          <title>My Wallet</title>
        </Head>

        <div className="p-4">
          <h1 className="text-2xl font-semibold">My Wallet</h1>
          <p className="text-gray-500">Your current balance is {balance}.</p>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-md">
          <h2 className="text-xl font-semibold mb-4">Add Funds</h2>

          <form>
            <label htmlFor="amount" className="sr-only">
              Amount
            </label>
            <div className="flex items-center border-b border-gray-200 pb-2 mb-4">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                id="amount"
                className="flex-1 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Enter amount"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-500 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Funds
              <HiOutlineArrowNarrowRight className="ml-2" />
            </button>
          </form>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-md mt-4">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

          <ul>
            <li className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mr-4"></div>
              <div>
                <p className="text-gray-500">Received $500 from John Doe</p>
                <p className="text-sm text-gray-400">2022-04-27 10:30:15 AM</p>
              </div>
              <p className="ml-auto text-gray-600 font-semibold">+$500</p>
            </li>

            <li className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mr-4"></div>
              <div>
                <p className="text-gray-500">Sent $200 to Jane Doe</p>
                <p className="text-sm text-gray-400">2022-04-26 2:30:00 PM</p>
              </div>
              <p className="ml-auto text-red-600 font-semibold">-$200</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
