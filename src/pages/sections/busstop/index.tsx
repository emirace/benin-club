import { busStop } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function BusStop() {
  return (
    <div>
      <HeroSectionPage
        name="Bus Stop"
        desc="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis."
      />
      <SectionHistory data={busStop} />
    </div>
  );
}
