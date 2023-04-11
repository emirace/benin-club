import { buttonStyleW } from '@/constants/styles';
import Image from 'next/image';
import { FaMapMarker, FaPhone, FaEnvelope } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="relative py-12 bg-black">
      <div className="absolute inset-0">
        <Image
          src="/images/image3.jpg"
          alt="footer background"
          fill
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-75"></div>
      </div>
      <div className="relative  container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        <div className="text-white md:pr-8">
          <div className="flex flex-row gap-4">
            <h2 className="text-3xl md:text-5xl font-base mb-8">VISIT</h2>
            <h2 className="text-3xl md:text-5xl font-bold text-red mb-8">
              BENIN CLUB
            </h2>
          </div>
          <p className="mb-8">
            Club life in Benin club, as a respectable community centre for
            recreation, intercourse and communion has come to stay. Today, the
            club stands proundly amongst the first and best of any kind, in any
            city in Nigeria with a very comfortable clubbing ambience.
          </p>
          <ul className="space-y-2 mb-8">
            <li>
              <FaMapMarker className="inline-block mr-2" />1 Ambrose Ali Avenue
              GRA, PO Box 393, Benin City
            </li>
            <li>
              <FaPhone className="inline-block mr-2" />
              (123) 456-7890
            </li>
            <li>
              <FaEnvelope className="inline-block mr-2" />
              info@beninclub1931.com
            </li>
          </ul>
        </div>
        <div className="text-white">
          <div className="flex flex-row gap-4">
            <h2 className="text-3xl md:text-5xl font-base mb-8">SUBCRIBE</h2>
            <h2 className="text-3xl md:text-5xl font-bold text-red mb-8">
              NOW
            </h2>
          </div>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-2 px-2 bg-white rounded-lg mb-4"
            />
            <button type="submit" className={`${buttonStyleW}`}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <hr className="relative my-8 border-white" />
      <div className="absolute bottom-5 left-0 right-0 text-center mt-8 text-white z-10">
        <p>&copy; 2023 Benin Club. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
