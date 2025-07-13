import { FC } from "react";

interface AboutUsProps {
  // Add your props here
  children?: React.ReactNode;
}

const AboutUs: FC<AboutUsProps> = ({ children }) => {
  return (
    <section className="container py-20 px-8 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="">
          <p className="mb-2 text-accent text-sm uppercase font-bold font-barlow leading-7 tracking-widest">
            About Us
          </p>
          <h4 className="text-4xl font-bold font-poppins leading-12 uppercase">
            Crafting Your Perfect Travel Story
          </h4>
          <p className="mt-4 text-muted-foreground max-w-prose ">
            At Smart Turn Holidays, we are your trusted partner for unparalleled
            travel. Based in UAE, we specialize in comprehensive inbound tour
            packages – offering the best deals on attraction tickets and city
            tours. Our expertise also covers expertly curated outbound packages
            worldwide, complete with visa assistance and convenient car rental
            services. Our passion: crafting unforgettable memories with
            unmatched service.
          </p>
          <p className="mt-4 text-muted-foreground max-w-prose ">
            We're driven by an unwavering commitment to quality and an
            innovative approach that transforms every trip into a success story.
            We set new industry benchmarks, meticulously crafting exceptional
            inbound experiences in Dubai and extraordinary outbound packages
            worldwide. Our passion ensures your journey is not just a trip, but
            an unforgettable adventure.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2 lg:mt-0">
          <div className="bg-muted aspect-square"></div>
          <div className="bg-muted aspect-square"></div>
          <div className="bg-muted aspect-square"></div>
          <div className="bg-muted aspect-square"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
