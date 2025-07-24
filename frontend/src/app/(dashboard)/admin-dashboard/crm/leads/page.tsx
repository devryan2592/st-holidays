"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

import PageHeader from "@/components/dashboard/page-header";
import { LoadingSpinner } from "@/components/common-ui/loading-spinner";
import { ErrorDisplay } from "@/components/common-ui/error-display";
import LeadsTable from "@/components/dashboard/tables/leads-table";
import { DUMMY_LEADS } from "@/lib/dummy-data/leads";
import { Lead } from "@/types/lead";

// Simulated API call function
const fetchLeads = async ({
  pageIndex = 0,
  pageSize = 10,
  sorting = [],
  columnFilters = [],
}: {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
}) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, you would make an actual API call here
  // For example:
  // const response = await fetch(`/api/leads?page=${pageIndex + 1}&pageSize=${pageSize}`);
  // if (!response.ok) throw new Error('Failed to fetch leads');
  // return response.json();

  // For now, we'll use the mock data with simulated pagination/sorting/filtering
  let filteredData = [...DUMMY_LEADS];

  // Apply filters
  columnFilters.forEach(filter => {
    const { id, value } = filter;
    if (value && typeof value === 'string') {
      filteredData = filteredData.filter(row =>
        String(row[id as keyof Lead]).toLowerCase().includes(value.toLowerCase())
      );
    }
  });

  // Apply sorting
  if (sorting.length > 0) {
    const { id, desc } = sorting[0];
    filteredData.sort((a, b) => {
      const aValue = a[id as keyof Lead];
      const bValue = b[id as keyof Lead];

      if (aValue === bValue) return 0;
      if (aValue == null) return desc ? -1 : 1;
      if (bValue == null) return desc ? 1 : -1;

      return aValue > bValue ? (desc ? -1 : 1) : desc ? 1 : -1;
    });
  }

  // Apply pagination
  const pageCount = Math.ceil(filteredData.length / pageSize);
  const startRow = pageIndex * pageSize;
  const endRow = startRow + pageSize;
  const paginatedData = filteredData.slice(startRow, endRow);

  return {
    data: paginatedData,
    pageCount,
    totalCount: filteredData.length,
  };
};

const LeadsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Define the type for our query data
  type LeadsQueryData = {
    data: Lead[];
    pageCount: number;
    totalCount: number;
  };

  // Fetch data with React Query
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<LeadsQueryData, Error>({
    queryKey: ["leads", { pagination, sorting, columnFilters }],
    queryFn: () => fetchLeads({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sorting,
      columnFilters,
    }),
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
        />
      </div>

      {/* Show loading spinner on initial load */}
      {isLoading && !data ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size={32} text="Loading leads..." />
        </div>
      ) : (
        <LeadsTable
          data={data?.data || []}
          isLoading={isLoading}
          pageCount={data?.pageCount || 0}
          pagination={pagination}
          sorting={sorting}
          columnFilters={columnFilters}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          onColumnFiltersChange={setColumnFilters}
        />
      )}
    </div>
  );
};

export default LeadsPage;
