import { FC } from "react";
import { Bus, Camera, Hotel, Info } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TourCardProps {
  // Add your props here
  children?: React.ReactNode;
  className?: string;
}

const TourCard: FC<TourCardProps> = ({ children, className }) => {
  return (
    <Card
      className={cn(
        "rounded-none p-3 group hover:shadow-2xl hover:translate-y-[-3px] transition duration-300",
        className
      )}
    >
      <CardContent className="p-0 ">
        <div className="relative aspect-video overflow-hidden">
          <Image
            className="rounded-none  transition duration-300"
            src="/dubai.jpg"
            alt=""
            fill
          />
        </div>
        <div className="mt-2 flex flex-row justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold cursor-pointer hover:text-primary leading-5">
              European Panaroma
            </h3>
            <p className="text-sm mt-[1px] text-muted-foreground">
              Thailand | Singapore
            </p>
          </div>
          <p className="text-sm mt-[1px] text-muted-foreground ">
            4 Nights / 5 Days
          </p>
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
          Embark on a magical journey through Europe's most iconic cities and
          landmarks. Experience rich history, stunning architecture, and vibrant
          cultures across multiple countries.
        </p>

        <Separator className="mt-4" />
        <div className="mt-4 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col ">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="font-semibold font-poppins text-primary">AED 5000</p>
          </div>
          <Button variant="outline" className="h-10 cursor-pointer">
            View Package
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TourCard;
