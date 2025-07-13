import { FC } from "react";

interface StickyFooterCardProps {
  // Add your props here
  children?: React.ReactNode;
}

const StickyFooterCard: FC<StickyFooterCardProps> = ({ children }) => {
  return <div className="flex flex-row"></div>;
};

export default StickyFooterCard;
