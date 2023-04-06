import { buttonStyle, buttonStyleOutline } from "@/constants/styles";
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 py-8 px-4 shadow-2xl">
      <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">About</h2>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase text-red">
          Benin CLub
        </h2>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et
          nisl euismod, feugiat quam eget, consectetur tortor. Vestibulum ut
          commodo augue. Praesent sit amet sagittis lorem. adipiscing elit.
          Aliquam et nisl euismod, feugiat quam eget, consectetur tortor.
          Vestibulum ut commodo augue. Praesent sit amet sagittis lorem.
        </p>
        <p className="text-gray-700 mb-4">
          Duis sollicitudin ante vel neque pretium volutpat. Nam ut libero id
          turpis sodales egestas nec vel velit. Sed sagittis, eros in efficitur
          rhoncus, nisi est aliquam leo, sed bibendum turpis nunc id lacus.
          adipiscing elit. Aliquam et nisl euismod, feugiat quam eget,
          consectetur tortor. Vestibulum ut
        </p>
        <div className="flex gap-3 mt-4 flex-col md:flex-row">
          <div>
            <Link href="/membership">
              <button className={`${buttonStyle} `}>Join The Club</button>
            </Link>
          </div>
          <div>
            <Link href="/about">
              <button className={`${buttonStyleOutline}`}>Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full h-96 md:w-1/2 ">
        <Image
          src="/images/hero.webp"
          alt="Hero background image"
          fill
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
};

export default AboutSection;
