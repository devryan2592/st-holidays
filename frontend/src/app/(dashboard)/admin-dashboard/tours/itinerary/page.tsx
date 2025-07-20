import PageHeader from "@/components/dashboard/page-header";
import ItineraryTable from "@/components/dashboard/tables/itinerary-table";
import { NextPage } from "next";

interface ItineraryPageProps {
  // Add your page props here
}

const ItineraryPage: NextPage<ItineraryPageProps> = (props) => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Itinerary"
        description="Create and manage your travel itineraries with ease."
      />
      <ItineraryTable />
    </div>
  );
};

export default ItineraryPage;
