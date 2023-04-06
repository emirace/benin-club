import NewsCard from "@/components/NewsCard";
import { news } from "@/constants/newsCard";
import { buttonStyle } from "@/constants/styles";
import Link from "next/link";

const NewsSection = () => {
  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col justify-center items-center">
        <div className="uppercase">benin club</div>
        <div className="flex md:flex-row gap-4 ">
          <h2 className="text-4xl md:text-6xl uppercase font-base mb-2">
            Latest
          </h2>
          <h2 className="text-4xl md:text-6xl uppercase font-bold mb-8 text-red">
            News
          </h2>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {news.slice(0, 4).map((n) => (
          <NewsCard key={n.id} news={n} />
        ))}
      </div>
      <Link href={"/#"} className="flex justify-center items-center mt-8">
        <button className={`${buttonStyle}`}>MORE NEWS</button>
      </Link>
    </div>
  );
};

export default NewsSection;
