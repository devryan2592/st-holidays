"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import PageHeader from "@/components/dashboard/page-header";

import { DUMMY_LEADS } from "@/lib/dummy-data/leads";
import LeadsTable from "@/components/dashboard/tables/leads-table";

const LeadsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Simulate API call with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      // In a real app, you would fetch data from your API here
      // For now, we'll use the mock data
      // const start = pagination.pageIndex * pagination.pageSize;
      // const end = start + pagination.pageSize;
      // const filteredData = applyFilters(DUMMY_LEADS, columnFilters);
      // const sortedData = applySorting(filteredData, sorting);

      return {
        DUMMY_LEADS
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
      <div className="flex items-center justify-between">
        <PageHeader
          title="Leads"
          description="Manage and track your leads in one place."
        />

      </div>

      <LeadsTable
        data={data?.DUMMY_LEADS}
      />
    </div>
  );
};

export default LeadsPage;
