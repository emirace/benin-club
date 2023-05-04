import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function SPORT() {
  const { title, description } = services[5];
  return (
    <>
      <HeroSectionPage
        image="/images/image3.jpg"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              SPORT SHOP
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Benin Gol Club Pro Shop was establised to provide items needed for
              absolute golfing experience for golfers in the club and its
              environs. The sport is where all kind of quality branded apparels
              such as shirts, face cap, arm sleeves, trousers, shorts, golf cart
              bags of all range, golf trolleys, golf balls, umbrellas, rain
              jackets, casino marker, towels etc, others include trophies and
              medals.
            </p>
            <p className="mt-4 text-lg text-gray-500"></p>
          </div>
        </div>
      </div>
    </>
  );
}
