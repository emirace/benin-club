import Gallery from '@/components/Gallery';
import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function Grill() {
  const { title, description } = services[2];
  return (
    <>
      <HeroSectionPage
        image="/images/grill/image1.jpg"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              ADAMU SUYA SPOT
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Adamu Suya Spot prepares Ram Suya, Chicken suya, Cow meat etc.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              LABIS BARBECUE
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Labis Barbecue specializes in making Barbecue with all kinds of
              fish.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              UMARU HUSANI SUYA SPOT
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              in Golf Section, specializes in making Suya such as Chicken, Ram
              and Assorted.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              A B C CENTER
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              in Golf Section, prepares Barbecue fish, club sandwich, instant
              noodles etc.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
