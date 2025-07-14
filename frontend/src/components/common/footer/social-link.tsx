import { FC } from "react";

interface SocialLinkProps {
  // Add your props here
  children?: React.ReactNode;
}

const SocialLink: FC<SocialLinkProps> = ({ children }) => {
  return (
    <div className="border rounded-full p-2 flex items-center justify-center transition-all duration-300">
      {children}
    </div>
  );
};

export default SocialLink;
