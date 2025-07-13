import { FC } from "react";

interface FeaturedDestinationsProps {
  // Add your props here
  children?: React.ReactNode;
}

const FeaturedDestinations: FC<FeaturedDestinationsProps> = ({ children }) => {
  return (
    <section className=" bg-secondary">
      <div className="container py-20 px-8 mx-auto max-w-7xl">
        <div className="">
          <p className="mb-2 text-accent text-sm uppercase font-bold font-barlow leading-7 tracking-widest">
            Featured Destinations
          </p>
          <h4 className="text-4xl font-bold font-poppins leading-12 uppercase">
            Unforgettable Journeys Start Here
          </h4>
          <p className="text-muted-foreground ">
            Get inspired for your next getaway! We've highlighted some of our
            most popular and breathtaking destinations.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 md:grid-rows-3 gap-4">
          <div className="aspect-video md:aspect-auto md:col-span-2 md:row-span-2 bg-red-300"></div>
          <div className="aspect-video md:aspect-auto md:row-span-2 bg-red-400"></div>
          <div className="aspect-video bg-red-500"></div>
          <div className="aspect-video bg-red-600"></div>
          <div className="aspect-video bg-red-700"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
