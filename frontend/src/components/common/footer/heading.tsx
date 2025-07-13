import { FC } from "react";

interface HeadingProps {
  // Add your props here
  children?: React.ReactNode;
}

const Heading: FC<HeadingProps> = ({ children }) => {
  return (
    <div className="w-fit">
      <h4 className="font-poppins text-sm font-semibold tracking-tight uppercase">
        {children}
      </h4>
      <div className="mt-1 w-full h-[0.5px] bg-primary-foreground/50" />
    </div>
  );
};

export default Heading;
