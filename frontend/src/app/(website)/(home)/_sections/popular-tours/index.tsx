import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bus, Camera, Hotel, Info } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface PopularToursProps {
  // Add your props here
  children?: React.ReactNode;
}

const PopularTours: FC<PopularToursProps> = ({ children }) => {
  return (
    <section className="container py-20 px-8 mx-auto max-w-7xl">
      <div className="flex flex-col ">
        <p className="mb-1 text-accent text-sm uppercase font-bold font-barlow leading-7 tracking-widest">
          Popular Tours
        </p>
        <h2 className="text-4xl font-bold font-poppins leading-12 uppercase ">
          Discover Our Most Popular Tours
        </h2>
        <p className="text-muted-foreground">
          Explore our bestselling tours, handpicked for unforgettable adventures
          in Dubai and beyond.
        </p>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="border p-4">
            <div className="relative aspect-video">
              <Image src="/dubai.jpg" alt="" fill />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">European Panaroma</h3>
                <p className="text-sm mt-[1px] text-muted-foreground">
                  4 Nights / 5 Days
                </p>
              </div>
              <Info size={15} className="stroke-[1px]" />
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <h4 className="text-sm font-semibold">Inclusions:</h4>
              <div className="border p-1.5 w-fit h-fit">
                <Hotel size={15} className="stroke-[1.5]" />
              </div>
              <div className="border p-1.5 w-fit h-fit">
                <Camera size={15} className="stroke-[1.5]" />
              </div>
              <div className="border p-1.5 w-fit h-fit">
                <Bus size={15} className="stroke-[1.5]" />
              </div>
            </div>

            <p className="text-sm mt-3 text-muted-foreground line-clamp-2">
              Embark on a magical journey through Europe's most iconic cities
              and landmarks. Experience rich history, stunning architecture, and
              vibrant cultures across multiple countries.
            </p>

            <Separator className="mt-4" />
            <div className="mt-4 flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col ">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-semibold font-poppins">AED 5000</p>
              </div>
              <Button variant="outline" className="h-10 cursor-pointer">
                View Package
              </Button>
            </div>
          </div>
          <div className="border p-4">
            <div className="relative aspect-video">
              <Image src="/dubai.jpg" alt="" fill />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">European Panaroma</h3>
                <p className="text-sm mt-[1px] text-muted-foreground">
                  4 Nights / 5 Days
                </p>
              </div>
              <Info size={15} className="stroke-[1px]" />
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <h4 className="text-sm font-semibold">Inclusions:</h4>
              <div className="border p-1.5 w-fit h-fit">
                <Hotel size={15} className="stroke-[1.5]" />
              </div>
              <div className="border p-1.5 w-fit h-fit">
                <Camera size={15} className="stroke-[1.5]" />
              </div>
              <div className="border p-1.5 w-fit h-fit">
                <Bus size={15} className="stroke-[1.5]" />
              </div>
            </div>

            <p className="text-sm mt-3 text-muted-foreground line-clamp-2">
              Embark on a magical journey through Europe's most iconic cities
              and landmarks. Experience rich history, stunning architecture, and
              vibrant cultures across multiple countries.
            </p>

            <Separator className="mt-4" />
            <div className="mt-4 flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col ">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-semibold font-poppins">AED 5000</p>
              </div>
              <Button variant="outline" className="h-10 cursor-pointer">
                View Package
              </Button>
            </div>
          </div>
          <div className="border p-4">
            <div className="relative aspect-video">
              {/* <div className="bg-secondary/70 absolute top-0 left-0 w-full h-full"></div> */}
              <Image src="/dubai.jpg" alt="" fill />
            </div>
            <div className="mt-2 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold">European Panaroma</h3>
                <p className="text-sm mt-[1px] text-muted-foreground">
                  4 Nights / 5 Days
                </p>
              </div>
              <Info size={15} className="stroke-[1px]" />
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <h4 className="text-sm font-semibold">Inclusions:</h4>
              <div className="border p-1.5 w-fit h-fit">
                <Hotel size={15} className="stroke-[1.5]" />
              </div>
              <div className="border p-1.5 w-fit h-fit">
                <Camera size={15} className="stroke-[1.5]" />
              </div>
              <div className="border p-1.5 w-fit h-fit">
                <Bus size={15} className="stroke-[1.5]" />
              </div>
            </div>

            <p className="text-sm mt-3 text-muted-foreground line-clamp-2">
              Embark on a magical journey through Europe's most iconic cities
              and landmarks. Experience rich history, stunning architecture, and
              vibrant cultures across multiple countries.
            </p>

            <Separator className="mt-4" />
            <div className="mt-4 flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col ">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-semibold font-poppins">AED 5000</p>
              </div>
              <Button variant="outline" className="h-10 cursor-pointer">
                View Package
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularTours;
