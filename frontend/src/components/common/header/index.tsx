"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { FC, useState } from "react";

interface HeaderProps {
  // Add your props here
  children?: React.ReactNode;
}

// Getting the current scroll position
const Header: FC<HeaderProps> = ({ children }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 200);
  });

  return (
    <header
      className={`fixed top-0 left-0 border-black  border-b h-24 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white text-black border-gray-200 shadow-sm"
          : "bg-black text-white"
      }`}
    >
      Header
    </header>
  );
};

export default Header;
