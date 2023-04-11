import { swimming } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function SwimmingPool() {
  return (
    <div>
      <HeroSectionPage
        name="Swimming Pool"
        desc="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis."
      />
      <SectionHistory data={swimming} />
    </div>
  );
}
