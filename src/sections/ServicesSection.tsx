import { ServiceCard } from "@/components/Services";
import { services } from "@/constants/servicesCard";
import React from "react";

const ServicesSection = () => {
  return (
    <section className=" py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-black">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4">
          {services.map((service) => (
            <div key={service.id}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
