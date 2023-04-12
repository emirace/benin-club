import HeroSectionPage from '@/sections/HeroSectionPage';
import ServicesSection from '@/sections/ServicesSection';

const Services = () => {
  return (
    <div>
      <HeroSectionPage
        name="services"
        desc="Morbi quis velit in lectus malesuada tincidunt a vel sapien. Fusce dignissim feugiat est ac lobortis"
        image="/images/manetKitchen/image1.JPG"
      />
      <ServicesSection />
    </div>
  );
};

export default Services;
