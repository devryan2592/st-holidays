import PageBreadCrumbs from "@/components/common/page-hero/page-breadcrumb";
import { FC } from "react";

interface HeroImagesProps {
  // Add your props here
  children?: React.ReactNode;
}

const HeroImages: FC<HeroImagesProps> = ({ children }) => {
  return (
    <section className="py-4">
      <div className="max-w-fit">
        <PageBreadCrumbs />
      </div>
      <div className="mt-4 grid grid-cols-5 grid-rows-2 gap-4">
        <div className="col-span-3 row-span-2 bg-red-100"></div>
        <div className="aspect-square bg-red-200"></div>
        <div className="aspect-square bg-red-300"></div>
        <div className="aspect-square bg-red-400"></div>
        <div className="aspect-square bg-red-500"></div>
      </div>
    </section>
  );
};

export default HeroImages;
