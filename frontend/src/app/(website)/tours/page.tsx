import { NextPage } from "next";
import TourCard from "@/components/common/tour/tour-card";
import TourFilter from "./_components/tour-filter";
import PageHero from "@/components/common/page-hero";
import Sort from "./_components/sort";

interface ToursProps {
  // Add your page props here
}

const Tours: NextPage<ToursProps> = (props) => {
  return (
    <>
      <PageHero
        title="Explore Our World of Destinations"
        description="Your journey to incredible experiences starts right here."
      />
      <div className="container pb-20 mt-10 px-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="basis-1/4 shrink-0">
            <TourFilter />
          </div>
          <section className="basis-3/4">
            <div className="flex justify-end">
              <Sort />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 ">
              <TourCard className="hover:shadow-2xl hover:translate-y-[-3px] transition duration-300" />
              <TourCard className="hover:shadow-2xl hover:translate-y-[-3px] transition duration-300" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Tours;
