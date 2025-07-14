import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import TourHighlights from "./highlights";
const tabs = [
  {
    name: "Highlights",
    value: "highlights",
    content: <TourHighlights />,
  },
  {
    name: "npm",
    value: "npm",
    content: "npx shadcn@latest add tabs",
  },
  {
    name: "yarn",
    value: "yarn",
    content: "npx shadcn@latest add tabs",
  },
  {
    name: "bun",
    value: "bun",
    content: "bunx --bun shadcn@latest add tabs",
  },
];

interface TourDetailTabsProps {
  // Add your props here
  children?: React.ReactNode;
}

const TourDetailTabs: FC<TourDetailTabsProps> = ({ children }) => {
  return (
    <Tabs defaultValue={tabs[0].value} className="mt-10 w-full basis-4/6">
      <TabsList className="w-full p-0 bg-background justify-start border rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-none bg-background h-full data-[state=active]:shadow-none border border-b-[3px] border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:font-semibold text-muted-foreground"
          >
            <p className="font-barlow text-base">{tab.name}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="">
          <div className="border p-2">{tab.content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TourDetailTabs;
