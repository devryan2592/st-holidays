import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import React from "react";
import StickyFooter from "@/components/common/footer/sticky-footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyFooter />
    </>
  );
}
