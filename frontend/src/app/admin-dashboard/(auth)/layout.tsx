import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="flex items-center justify-center h-screen">
      {children}
    </main>
  );
}
