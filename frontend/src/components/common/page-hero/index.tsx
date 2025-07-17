import { FC } from "react";
import PageBreadCrumbs from "./page-breadcrumb";

interface PageHeroProps {
  // Add your props here
  title: string;
  description: string;
  image?: string;
}

const PageHero: FC<PageHeroProps> = ({ title, description, image }) => {
  return (
    <section>
      <div className="relative h-[500px] bg-red-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center top-10 text-white">
          <div className="container max-w-7xl px-8 mx-auto text-center">
            <h1 className="text-5xl uppercase tracking-wide leading-14 font-bold mb-2 font-poppins">
              {title}
            </h1>
            <p className="text-muted-forground ">{description}</p>
          </div>
        </div>
      </div>

      <div className="mt-2 container max-w-7xl px-8 mx-auto flex justify-end">
        <div className="w-fit">
          <PageBreadCrumbs />
        </div>
      </div>
    </section>
  );
};

export default PageHero;
