"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import PageHeader from "@/components/dashboard/page-header";
import { LoadingSpinner } from "@/components/common-ui/loading-spinner";
import { ErrorDisplay } from "@/components/common-ui/error-display";
import { DUMMY_LEADS } from "@/lib/dummy-data/leads";
import LeadsTable from "./_components/table";
import { LeadsQueryData } from "@/types/lead";

// Simulated API call function
const fetchLeads = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, you would make an actual API call here
  // For example:
  // const response = await fetch(`/api/leads?page=${pageIndex + 1}&pageSize=${pageSize}`);
  // if (!response.ok) throw new Error('Failed to fetch leads');
  // return response.json();

  // For now, we'll use the mock data with simulated pagination/sorting/filtering
  let filteredData = [...DUMMY_LEADS];
  return {
    data: filteredData,
  };
};

const LeadsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch data with React Query
  const {
    data: leadsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<LeadsQueryData, Error>({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
  });

  // Handle error state
  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <ErrorDisplay
          error={error}
          onRetry={() => refetch()}
          className="mx-auto max-w-2xl"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Leads"
          description="Manage and track your leads in one place."
          newButtonPath="/admin-dashboard/crm/leads/new"
        />
      </div>

      {/* Show loading spinner on initial load */}

      <LeadsTable leadsData={leadsData} isLoading={isLoading} />
    </div>
  );
};

export default LeadsPage;
