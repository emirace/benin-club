import { darts } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function Darts() {
  return (
    <div>
      <HeroSectionPage
        name="Darts"
        desc="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis."
      />
      <SectionHistory data={darts} />
    </div>
  );
}
