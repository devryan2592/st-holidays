import { FC } from "react";

interface StickyFooterProps {
  // Add your props here
  children?: React.ReactNode;
}

const StickyFooter: FC<StickyFooterProps> = ({ children }) => {
  return (
    <div className="sticky z-50 bottom-0 left-0 right-0 bg-primary h-24 text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-8 flex flex-row justify-between py-10">
        {children}
      </div>
    </div>
  );
};

export default StickyFooter;
