import { News } from "@/types/newsCard";
import Image from "next/image";

interface NewsCardProps {
  news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const date = new Date(news.date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-56">
        <Image
          src={news.image}
          alt={news.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 bg-white text-black">
          <p className="text-lg font-bold  px-4">{day}</p>
          <p className="text-sm  px-4">{month}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex space-x-2">
          {news.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 py-1 px-2 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mt-2">{news.title}</h2>
        <p className="text-gray-600 mt-2">{news.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
