'use client';
import Image from 'next/image';
import { useState } from 'react';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image2.jpg',
  '/images/image1.jpg',
];

const SectionHistory = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setExpandedImage(image);
  };

  const handleCloseExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-base tracking-wide uppercase">
            About us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-red  md:text-5xl uppercase">
            Our story
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
        <div className="mt-10">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-10">
              <h3 className="text-3xl md:text-5xl uppercase font-bold text-black">
                Details
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at
                velit maximus, venenatis justo sed, accumsan felis. Fusce eu
                justo vel dolor accumsan faucibus. Suspendisse lacinia, eros a
                facilisis fermentum, odio massa viverra metus, eu feugiat quam
                nisi sit amet erat.
              </p>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <Image
                src="/images/image3.jpg"
                alt="About image"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shadow-xl rounded-t-lg p-4">
              {images.map((image) => (
                <div className="relative" key={image}>
                  <button
                    key={image}
                    className="relative inset-0 w-full h-36 md:h-64"
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image}
                      alt="Gallery image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {expandedImage && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black opacity-75"
            onClick={handleCloseExpandedImage}
          />
          <div className="relative">
            <button
              className="absolute top-0 right-0 p-4"
              onClick={handleCloseExpandedImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.293a1 1 0 00-1.414-1.414L10 8.586 7.121 5.707a1 1 0 00-1.414 1.414L8.586 10l-2.879 2.879a1 1 0 101.414 1.414L10 11.414l2.879 2.879a1 1 0 001.414-1.414L11.414 10l2.879-2.879z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="max-w-screen-lg mx-auto">
              <Image
                src={expandedImage}
                alt="Expanded image"
                layout="responsive"
                objectFit="contain"
                width={1920}
                height={1080}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SectionHistory;
