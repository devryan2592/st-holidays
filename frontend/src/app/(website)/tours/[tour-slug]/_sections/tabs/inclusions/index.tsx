import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { Check, X }
 from "lucide-react";

interface TourInclusionsProps {
  // Add your props here
  children?: React.ReactNode;
}

const inclusions = [
    "Accommodation in well-appointed hotels",
    "Daily breakfast at the hotel",
    "Airport transfers in a comfortable vehicle",
    "Guided city tours as per the itinerary",
    "Entrance fees to all mentioned attractions",
    "Services of a professional tour guide",
    "All applicable taxes and service charges",
];

const exclusions = [
    "International and domestic airfare",
    "Visa fees and travel insurance",
    "Lunches, dinners, and any other meals not mentioned",
    "Personal expenses such as laundry, telephone calls, etc.",
    "Optional tours and activities",
    "Tips for guides, drivers, and hotel staff",
    "Any other services not specified in the inclusions",
];

const TourInclusions: FC<TourInclusionsProps> = ({ children }) => {
  return (
    <Tabs defaultValue="inclusions" className="w-full">
      <TabsList className="w-full p-0 bg-background justify-start border rounded-none">
        <TabsTrigger
          value="inclusions"
          className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold text-muted-foreground"
        >
          Inclusions
        </TabsTrigger>
        <TabsTrigger
          value="exclusions"
          className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold text-muted-foreground"
        >
          Exclusions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inclusions" className="bg-background">
        <div className="flex flex-col gap-2 p-2">
          {inclusions.map((inclusion) => (
            <div key={inclusion} className="flex gap-3 items-center">
              <Check
                className="stroke-green-500 stroke-[1.5] shrink-0"
                size={20}
              />
              <p className="text-muted-foreground">{inclusion}</p>
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="exclusions" className="bg-background">
        <div className="flex flex-col gap-2 p-2">
          {exclusions.map((exclusion) => (
            <div key={exclusion} className="flex gap-3 items-center">
              <X className="stroke-red-500 stroke-[1.5] shrink-0" size={20} />
              <p className="text-muted-foreground">{exclusion}</p>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TourInclusions;