import { tableTennis } from '@/constants/sectionsCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import SectionHistory from '@/sections/SectionHistory';

export default function TableTennis() {
  return (
    <div>
      <HeroSectionPage
        name="Table Tennis"
        desc="Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis."
      />
      <SectionHistory data={tableTennis} />
    </div>
  );
}
