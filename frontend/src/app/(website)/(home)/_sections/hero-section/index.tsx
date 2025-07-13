import OutlineText from "@/components/custom-ui/outline-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

interface HeroSectionProps {
  // Add your props here
  children?: React.ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({ children }) => {
  return (
    <section className="h-screen flex items-center justify-center bg-red-500">
      <div className="flex-1 h-full relative">
        {/* <Image
          src="/dubai.jpg"
          alt="hero"
          fill
          className="object-cover absolute w-full h-full"
        /> */}
        <div className="bg-black/30 absolute w-full h-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center ">
          <h4 className="text-white/60 mb-2 text-sm font-poppins uppercase tracking-wider">
            Explore, Dream, Discover.
          </h4>
          <h1 className="text-5xl md:text-7xl tracking-wide leading-14 md:leading-20 uppercase font-bold text-white font-poppins">
            Discover Enchanting Culture in{" "}
            <OutlineText
              strokeColor="white"
              strokeWidth={1.5}
              className="text-5xl md:text-7xl"
            >
              Thailand
            </OutlineText>
          </h1>
          <div className="flex md:flex-row flex-col gap-4 mt-4 md:mt-6 w-full md:justify-center items-center">
            <Button className="h-12 w-full md:max-w-56 bg-white rounded-none text-sm text-black/90 font-poppins uppercase hover:bg-white/90 hover:text-black cursor-pointer duration-100 transition-all">
              View Holidays
            </Button>
            <Button className="h-12 w-full md:max-w-56 bg-transparent border border-white text-white rounded-none px-8 py-3 font-poppins uppercase hover:bg-accent hover:text-secondary cursor-pointer duration-200  transition-all">
              Request a Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
