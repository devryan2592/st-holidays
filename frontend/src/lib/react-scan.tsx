"use client";
import { FC, useEffect } from "react";
import { scan } from "react-scan";

interface ReactScanProps {
  // Add your props here
  children?: React.ReactNode;
}

export default function ReactScanInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      scan({ enabled: true });
    }
  }, []);
  return null; // This component doesn't render anything
}
