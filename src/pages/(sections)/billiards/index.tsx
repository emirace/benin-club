import { billiards } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function Billiards() {
  return (
    <div>
      <HeroSectionPage
        name="Billiards & Snooker"
        desc="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis."
      />
      <SectionHistory data={billiards} />
    </div>
  );
}
