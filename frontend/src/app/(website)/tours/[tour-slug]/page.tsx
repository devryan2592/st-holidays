import { NextPage } from "next";
import HeroImages from "./_sections/hero-images";
import { Clock } from "lucide-react";
import TourDetailTabs from "./_sections/tabs";
import { Separator } from "@/components/ui/separator";
import RelatedTours from "./_sections/related-tours";

interface TourDetailsProps {
  // Add your page props here
}

const TourDetails: NextPage<TourDetailsProps> = (props) => {
  return (
    <div className="">
      <div className="mt-24 container mx-auto px-8 max-w-7xl">
        <HeroImages />
        <div className="flex gap-10">
          <div className="flex flex-col basis-4/6">
            <div className="">
              <h2 className="text-2xl font-bold font-poppins leading-12 uppercase ">
                Discover Your Dream Destination
              </h2>
              <div>
                <p className="text-muted-foreground ">
                  At Smart Turn Holidays, we believe the world is yours to
                  explore. Our expertly curated portfolio spans continents,
                  offering everything from the dazzling urban landscapes of
                  Dubai to serene natural wonders and vibrant cultural hubs
                  across the globe. Dive in and find the perfect setting for
                  your next unforgettable adventure.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 ">
                <div className="flex gap-3 items-center">
                  <Clock className="stroke-[1.5]" size={20} />

                  <p className="text-muted-foreground">
                    <span className="font-semibold">Duration: </span>04 Nights
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock className="stroke-[1.5]" size={20} />

                  <p className="text-muted-foreground">
                    <span className="font-semibold">Tour Type: </span>Customized
                    Tour
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock className="stroke-[1.5]" size={20} />

                  <p className="text-muted-foreground">
                    <span className="font-semibold">Destination: </span>Dubai
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <Clock className="stroke-[1.5]" size={20} />

                  <p className="text-muted-foreground">
                    <span className="font-semibold">Tour Category: </span>Family
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <TourDetailTabs />
            </div>
          </div>

          <div className="basis-2/6">
            <div className="border p-2">
              <h2 className="text-4xl font-bold font-poppins leading-12 uppercase ">
                Book Your Dream Trip
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <div className="bg-secondary mt-10">
        <div className="container py-10 px-8 mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold font-poppins leading-10 uppercase ">
            Explore Related Tours
          </h2>
          <p className="text-muted-foreground ">
            Curious about other options? Check out these fantastic trips we
            think you'll love.
          </p>

          <div className="mt-6 ">
            <RelatedTours />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
