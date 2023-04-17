import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function Bar() {
  const { title, description } = services[0];
  return (
    <>
      <HeroSectionPage
        image="/images/leisure/image3.JPG"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-10">
              <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
                MAIN BAR
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Benin Club Main Bar include: the Down Lounge Bar and Golf
                Section Bar where all kinds of drinks such as soft drinks, beer,
                wine, spirit etc. are available.
              </p>
            </div>
            <div className="md:w-1/2 md:pr-10"></div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-10">
              <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
                MINI BAR
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Include Upper Lounge Bar also known as Greg Ero Upper Lounge and
                Swimming Pool bar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
