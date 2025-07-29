import PageHeader from "@/components/dashboard/page-header";
import CityForm from "./_components/city-form";
import CitiesTable from "./_components/cities-table";
import { dummyCities } from "./_components/dummy-data";

export default function CitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Cities"
        description="Manage your travel cities"
        newButtonPath="/admin-dashboard/tours/cities/new"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Form Column (60%) */}
        <div className="lg:col-span-2">
          <CityForm />
        </div>

        {/* Table Column (40%) */}
        <div className="lg:col-span-2">
          <CitiesTable data={dummyCities} />
        </div>
      </div>
    </div>
  );
}
