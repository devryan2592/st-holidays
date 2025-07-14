import AutoPlayCarousel from "@/components/custom-ui/autoplay-carousel";
import { FC } from "react";
import TourCard from "./tour-card";

interface RelatedToursProps {
  // Add your props here
  children?: React.ReactNode;
}

const RelatedTours: FC<RelatedToursProps> = ({ children }) => {
  return (
    <AutoPlayCarousel className="md:basis-1/2 lg:basis-1/3">
      <TourCard />
      <TourCard />
      <TourCard />
      <TourCard />
    </AutoPlayCarousel>
  );
};

export default RelatedTours;
