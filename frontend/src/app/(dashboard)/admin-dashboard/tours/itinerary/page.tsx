"use client";

import { NextPage } from "next";


import PageHeader from "@/components/dashboard/page-header";
import ItineraryTable from "@/components/dashboard/tables/itinerary-table";
import { dummyItems } from "@/lib/dummy-data";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface ItineraryPageProps {
  // Add your page props here
}

const ItineraryPage: NextPage<ItineraryPageProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Simulate API call with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["itinerary"],
    queryFn: async () => {
      // In a real app, you would fetch data from your API here
      // For now, we'll use the mock data
      // const start = pagination.pageIndex * pagination.pageSize;
      // const end = start + pagination.pageSize;
      // const filteredData = applyFilters(DUMMY_LEADS, columnFilters);
      // const sortedData = applySorting(filteredData, sorting);

      return {
        dummyItems
      };
    },
  });



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading leads</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Itinerary"
        description="Create and manage your travel itineraries with ease."
      />
      <ItineraryTable data={data?.dummyItems} />
    </div>
  );
};

export default ItineraryPage;
