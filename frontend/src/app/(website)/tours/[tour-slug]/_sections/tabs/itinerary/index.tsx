import { FC } from "react";
import ItineraryAccordion from "./itinerary-accordion";

interface ItineraryProps {
  // Add your props here
  children?: React.ReactNode;
}

const Itinerary: FC<ItineraryProps> = ({ children }) => {
  return <ItineraryAccordion />;
};

export default Itinerary;
