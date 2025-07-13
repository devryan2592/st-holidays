import { FC } from "react";

interface LinksProps {
  // Add your props here
  children?: React.ReactNode;
}

const Links: FC<LinksProps> = ({ children }) => {
  return (
    <p className="text-sm hover:text-primary-foreground/80 cursor-pointer">
      <span>- </span>
      {children}
    </p>
  );
};

export default Links;
