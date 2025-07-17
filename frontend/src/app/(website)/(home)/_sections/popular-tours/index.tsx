import TourCard from "@/components/common/tour/tour-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bus, Camera, Hotel, Info } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface PopularToursProps {
  // Add your props here
  children?: React.ReactNode;
}

const PopularTours: FC<PopularToursProps> = ({ children }) => {
  return (
    <section className="container py-20 px-8 mx-auto max-w-7xl">
      <div className="flex flex-col ">
        <p className="mb-1 text-accent text-sm uppercase font-bold font-barlow leading-7 tracking-widest">
          Popular Tours
        </p>
        <h2 className="text-4xl font-bold font-poppins leading-12 uppercase ">
          Discover Our Most Popular Tours
        </h2>
        <p className="text-muted-foreground">
          Explore our bestselling tours, handpicked for unforgettable adventures
          in Dubai and beyond.
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 gap-4">
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
          <TourCard />
        </div>
      </div>
    </section>
  );
};

export default PopularTours;
