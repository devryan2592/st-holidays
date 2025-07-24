"use client";

import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

import PageHeader from "@/components/dashboard/page-header";
import ItineraryTable from "@/components/dashboard/tables/itinerary-table";
import { dummyItems, Item } from "@/lib/dummy-data";
import { TableSkeleton } from "@/components/common-ui/table-skeleton";
import { ErrorDisplay } from "@/components/common-ui/error-display";
import { columns } from "@/components/dashboard/tables/itinerary-table/colums";

interface ItineraryPageProps {}

const ItineraryPage: NextPage<ItineraryPageProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  
  // Sorting state
  const [sorting, setSorting] = useState<SortingState>([]);
  
  // Column filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  
  // Fetch data with React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["itinerary", { pagination, sorting, columnFilters }],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would fetch data from your API here
      // For now, we'll use the mock data with pagination, sorting, and filtering
      let filteredData = [...dummyItems];
      
      // Apply column filters
      columnFilters.forEach(filter => {
        const { id, value } = filter;
        if (value && typeof value === 'string') {
          filteredData = filteredData.filter(item => 
            String(item[id as keyof Item]).toLowerCase().includes(value.toLowerCase())
          );
        }
      });
      
      // Apply sorting
      const sortedData = [...filteredData].sort((a, b) => {
        for (const sort of sorting) {
          const { id, desc } = sort;
          const aValue = a[id as keyof Item];
          const bValue = b[id as keyof Item];
          
          if (aValue === bValue) continue;
          
          if (aValue == null) return desc ? -1 : 1;
          if (bValue == null) return desc ? 1 : -1;
          
          if (aValue < bValue) return desc ? 1 : -1;
          if (aValue > bValue) return desc ? -1 : 1;
        }
        return 0;
      });
      
      // Apply pagination
      const pageCount = Math.ceil(sortedData.length / pagination.pageSize);
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      const paginatedData = sortedData.slice(start, end);
      
      return {
        data: paginatedData,
        pageCount,
        totalItems: sortedData.length,
      };
    },
    // keepPreviousData is not a valid option in this version of react-query
    // We'll use placeholderData instead for better UX during pagination
    placeholderData: (previousData) => previousData,
  });
  
  // Handle pagination change
  const handlePaginationChange = useCallback((pagination: PaginationState) => {
    setPagination(pagination);
  }, []);
  
  // Handle sorting change
  const handleSortingChange = useCallback((sorting: SortingState) => {
    setSorting(sorting);
  }, []);
  
  // Handle column filters change
  const handleColumnFiltersChange = useCallback((filters: ColumnFiltersState) => {
    setColumnFilters(filters);
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  }, []);

  // Loading state
  if (isLoading && !data) {
    return (
      <div className="space-y-4">
        <PageHeader
          title="Itinerary"
          description="Manage your itinerary items"
        />
        <TableSkeleton columns={columns.length} />
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="space-y-4">
        <PageHeader
          title="Itinerary"
          description="Manage your itinerary items"
        />
        <ErrorDisplay 
          error={error as Error} 
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }
  
  // No data state
  // Check if we have data and it's not just the placeholder
  const hasData = data && 'data' in data && data.data.length > 0;
  
  if (!hasData) {
    return (
      <div className="space-y-4">
        <PageHeader
          title="Itinerary"
          description="Manage your itinerary items"
        />
        <div className="rounded-md border p-4 text-center text-muted-foreground">
          No itinerary items found. Create your first item to get started.
        </div>
      </div>
    );
  }
  
  // Success state
  return (
    <div className="space-y-4">
      <PageHeader
        title="Itinerary"
        description="Manage your itinerary items"
      />
      <ItineraryTable 
        data={data?.data || []}
        // Pass pagination state
        pagination={pagination}
        // Pass sorting state
        sorting={sorting}
        // Pass column filters
        columnFilters={columnFilters}
        // Pass state updaters
        onPaginationChange={handlePaginationChange}
        onSortingChange={handleSortingChange}
        onColumnFiltersChange={handleColumnFiltersChange}
        // Pass page count for pagination
        pageCount={data?.pageCount || 0}
        // Pass loading state
        isLoading={isLoading}
      />
    </div>
  );
};

export default ItineraryPage;
