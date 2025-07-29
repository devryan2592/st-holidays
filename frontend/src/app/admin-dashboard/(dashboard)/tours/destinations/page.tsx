import PageHeader from "@/components/dashboard/page-header";
import DestinationForm from "./_components/destination-form";
import DestinationsTable from "./_components/destinations-table";
import { dummyDestinations } from "./_components/dummy-data";

export default function DestinationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Destinations"
        description="Manage your travel destinations"
        newButtonPath="/admin-dashboard/tours/destinations/new"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Form Column (60%) */}
        <div className="lg:col-span-2">
          <DestinationForm />
        </div>

        {/* Table Column (40%) */}
        <div className="lg:col-span-2">
          <DestinationsTable data={dummyDestinations} />
        </div>
      </div>
    </div>
  );
}
