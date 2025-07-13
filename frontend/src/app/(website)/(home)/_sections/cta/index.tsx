import { Button } from "@/components/ui/button";
import { FC } from "react";

interface CTAProps {
  // Add your props here
  children?: React.ReactNode;
}

const CTA: FC<CTAProps> = ({ children }) => {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-10 text-center md:text-left">
          <div className="flex flex-col md:w-1/2 ">
            <p className="font-poppins uppercase text-2xl font-bold">
              Looking for a Personalized Travel Experience?
            </p>
            <p className="mt-1 text-base text-muted-foreground">
              Let our travel experts design your perfect, personalized
              itinerary.
            </p>
          </div>

          <div className="flex items-center md:w-1/2">
            <Button className="w-full h-12" variant="outline">
              Request a call back
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
