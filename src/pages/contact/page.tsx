import AddressSection from "@/sections/AddressSection";
import ContactSection from "@/sections/ContactSection";
import HeroSectionPage from "@/sections/HeroSectionPage";

const Contact = () => {
  return (
    <div>
      <HeroSectionPage
        name="contact us"
        desc="Morbi quis velit in lectus malesuada tincidunt a vel sapien. Fusce dignissim feugiat est ac lobortis"
      />
      <div className="  mx-auto lg:max-w-7xl px-4 md:px-8  my-10 md:my-10  w-full">
        <AddressSection />
      </div>
      <div className="  mx-auto lg:max-w-7xl px-4 md:px-8   w-full">
        <ContactSection />
      </div>
    </div>
  );
};

export default Contact;
