import AboutSection from "@/sections/AboutSection";
import HeroSectionPage from "@/sections/HeroSectionPage";
import MissionVision from "@/sections/MissionVision";

export default function About() {
  return (
    <div>
      <HeroSectionPage
        name="About Us"
        desc="A place where you can find all the information about me and my work"
      />
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <MissionVision />
      </div>
      <div className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center my-10 md:my-20  w-full">
        <AboutSection />
      </div>
    </div>
  );
}
