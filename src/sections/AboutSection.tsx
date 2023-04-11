import { buttonStyle, buttonStyleOutline } from '@/constants/styles';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gray-100 py-8 px-4 shadow-2xl">
      <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0">
        <h2 className="text-4xl md:text-6xl font-base mb-2 uppercase">About</h2>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase text-red">
          Benin CLub
        </h2>
        <p className="text-gray-700 mb-4">
          Benin club was founded in 1931, by British Nationals until 1964, the
          club was known as EUROPEAN CLUB established by Europeans for their own
          private recreation; sport and entertainment away from the prying eyes
          and alien life of indigenous society, so to speak. The club seldom
          entertained Nigerians, not indigenous sportsmen or nobility.
        </p>
        <p className="text-gray-700 mb-4">
          Club life in Benin club, as a respectable community centre for
          recreation, intercourse and communion has come to stay. Today, the
          club stands proundly amongst the first and best of any kind, in any
          city in Nigeria with a very comfortable clubbing ambience. The modern
          day Benin Club 1931 is a story of success with first class facilities
          for it&apos;s over 3,000 active members. Over the years, the values
          that give us the edge have been sustained. The incipient Club house
          got burnt in 1968 and a lot of valuable records were destroyed. The
          club house was rebuilt in 1972.
        </p>
        <div className="flex gap-3 mt-4 flex-col md:flex-row">
          <div>
            <Link href="/auth/signup">
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
