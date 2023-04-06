import Image from "next/image";
import Link from "next/link";

interface Card {
  imageUrl: string;
  title: string;
  info: string;
  link: string;
}

interface Props {
  cards: Card[];
}

const HorizontalCards: React.FC<Props> = ({ cards }) => {
  return (
    <div className="flex overflow-x-scroll  no-scrollbar pb-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex-none w-80 p-4 shadow-lg rounded-lg bg-white mr-4 relative flex flex-col justify-center "
        >
          <div className="relative h-48 mb-10">
            <Image
              src={card.imageUrl}
              alt={card.title}
              fill
              className="rounded-lg"
            />
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-red border-white border-4 rounded-full w-20 h-20 flex justify-center items-center"></div>
          </div>
          <h3 className="text-lg font-black uppercase my-2 text-center">
            {card.title}
          </h3>
          <p className="text-gray-500 text-sm text-center max-h-16 overflow-hidden">
            {card.info}
          </p>
          <Link href={card.link} className="flex justify-center items-center">
            <button className="inline-block px-4 py-2 border border-red text-red rounded-lg mt-4 hover:bg-red hover:text-white transition duration-300 ease-in-out">
              Learn More
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCards;
