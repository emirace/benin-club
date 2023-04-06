"use client";
import { buttonStyle } from "@/constants/styles";
import { useState } from "react";

type Props = {
  handleCloseModal?: () => void;
};

export default function LoginForm({ handleCloseModal }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      `Email: ${email}, Password: ${password}, Remember me: ${rememberMe}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-4 md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4"
    >
      {handleCloseModal && (
        <div className="absolute right-4 top-2 md:top-4 mt-3 sm:mt-0 sm:ml-4">
          <button
            onClick={handleCloseModal}
            type="button"
            className="text-gray hover:text-pink focus:outline-none focus:text-pink transition ease-in-out duration-150"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="#000000"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 block w-full rounded-md p-2 mb-2  shadow-lg  focus:border-red focus:ring-red focus:outline-red"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-gray-700 font-medium mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 block w-full p-2 mb-2  rounded-md md:w-96  shadow-lg focus:border-red focus:ring-red focus:outline-red"
        />
      </div>
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="remember-me"
          name="remember-me"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-red border-red rounded checked:bg-red"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-gray-700 font-medium"
        >
          Remember me
        </label>
      </div>
      <div className="flex justify-end ml-6">
        <button
          type="button"
          className="bg-gray text-white py-2 px-4 border-2  rounded  mr-4"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button type="submit" className={`${buttonStyle}`}>
          Login
        </button>
      </div>
      <p className="text-gray-600 text-sm mt-6">
        Don&apos;t have an account yet?{" "}
        <a href="#" className="text-red underline">
          Sign up here
        </a>
        .
      </p>
      <p className="text-gray-600 text-sm mt-2">
        <a href="#" className="text-red underline">
          Forgot your password?
        </a>
      </p>
    </form>
  );
}
