import PageHero from "@/components/common/page-hero";
import { MapPin } from "lucide-react";
import { NextPage } from "next";

interface DestinationsProps {
  // Add your page props here
}

const Destinations: NextPage<DestinationsProps> = (props) => {
  return (
    <>
      <PageHero
        title="Explore Our World of Destinations"
        description="Your journey to incredible experiences starts right here."
      />

      <section className="container pb-20 mt-10 px-8 mx-auto max-w-7xl">
        <div className="flex flex-col ">
          <h2 className="text-4xl font-bold font-poppins leading-12 uppercase ">
            Discover Your Dream Destination
          </h2>
          <p className="text-muted-foreground">
            At Smart Turn Holidays, we believe the world is yours to explore.
            Our expertly curated portfolio spans continents, offering everything
            from the dazzling urban landscapes of Dubai to serene natural
            wonders and vibrant cultural hubs across the globe. Dive in and find
            the perfect setting for your next unforgettable adventure.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border hover:shadow-md overflow-hidden p-4">
            <div className="relative aspect-video  bg-red-300">
              <div className="absolute flex items-center gap-1 bottom-3 left-3">
                <MapPin className="-ml-1 stroke-[1.5]" size={24} />
                <h3 className="text-lg font-semibold font-poppins">Dubai</h3>
              </div>
            </div>

            <div className="pb-4 pt-2">
              <p className="text-sm text-muted-foreground line-clamp-3">
                Enjoy the iconic landmarks of Dubai, including the Burj Khalifa
                and the Palm Jumeirah. Visit the iconic Dubai Mall and shop for
                the latest fashion trends.
              </p>
            </div>
          </div>

          <div className="bg-white border hover:shadow-md overflow-hidden p-4">
            <div className="relative aspect-video  bg-red-300">
              <div className="absolute flex items-center gap-1 bottom-3 left-3">
                <MapPin className="-ml-1 stroke-[1.5]" size={24} />
                <h3 className="text-lg font-semibold font-poppins">Dubai</h3>
              </div>
            </div>

            <div className="pb-4 pt-2">
              <p className="text-sm text-muted-foreground line-clamp-3">
                Enjoy the iconic landmarks of Dubai, including the Burj Khalifa
                and the Palm Jumeirah. Visit the iconic Dubai Mall and shop for
                the latest fashion trends.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
