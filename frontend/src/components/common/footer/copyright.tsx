import { FC } from "react";

interface CopyrightProps {
  // Add your props here
  children?: React.ReactNode;
}

const Copyright: FC<CopyrightProps> = ({ children }) => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <p className="text-sm">
      Copyright © {year} Smart Turn Holidays FZ-LLC. All Rights Reserved.
    </p>
  );
};

export default Copyright;
