import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import Image from 'next/image';
import Link from 'next/link';

const MissionVision = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center bg-gray-100 ">
      <div className="relative w-full h-96 md:w-1/2 ">
        <Image
          src="/images/hero.webp"
          alt="Hero background image"
          fill
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="md:w-1/2 md:ml-8  mb-4 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-bold  uppercase text-red">
          Benin CLub
        </h2>
        <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">
          mission & vision
        </h2>

        <p className="text-gray-700 mb-4 text-justify"></p>
        <p className="text-gray-700 mb-4 text-justify"></p>
        <div className="flex gap-3 mt-4 flex-col md:flex-row">
          <div>
            <Link href="/membership">
              <button className={`${buttonStyle} `}>Join The Club</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
