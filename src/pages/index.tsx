import HorizontalCards from "@/components/HorizontalCards";
import { cards } from "@/constants/sectionsCard";
import AboutSection from "@/sections/AboutSection";
import HeroSection from "@/sections/HeroSection";
import NewsSection from "@/sections/NewsSection";
import UpcomingEventSection from "@/sections/UpcomingEventSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center -mt-60 md:-mt-40 w-full">
        <HorizontalCards cards={cards} />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <AboutSection />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <NewsSection />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <UpcomingEventSection />
      </div>
    </div>
  );
}
