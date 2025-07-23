"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import PageHeader from "@/components/dashboard/page-header";
import {DataTable} from "@/components/dashboard/tables/leads-table/data-table";
import { columns } from "@/components/dashboard/tables/leads-table/columns";
import { Lead } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DUMMY_LEADS } from "@/lib/dummy-data/leads";

const LeadsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // State for pagination
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // State for sorting
  const [sorting, setSorting] = useState([]);
  
  // State for column filters
  const [columnFilters, setColumnFilters] = useState([]);

  // Simulate API call with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads", pagination, sorting, columnFilters],
    queryFn: async () => {
      // In a real app, you would fetch data from your API here
      // For now, we'll use the mock data
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      const filteredData = applyFilters(DUMMY_LEADS, columnFilters);
      const sortedData = applySorting(filteredData, sorting);
      
      return {
        rows: sortedData.slice(start, end),
        pageCount: Math.ceil(filteredData.length / pagination.pageSize),
        total: filteredData.length,
      };
    },
  });

  // Helper function to apply filters
  const applyFilters = (data: Lead[], filters: any[]) => {
    if (!filters.length) return data;
    
    return data.filter((lead) => {
      return filters.every(({ id, value }) => {
        if (!value) return true;
        
        const leadValue = lead[id as keyof Lead];
        if (typeof leadValue === 'string') {
          return leadValue.toLowerCase().includes(value.toLowerCase());
        }
        if (typeof leadValue === 'number') {
          return leadValue.toString().includes(value);
        }
        return true;
      });
    });
  };

  // Helper function to apply sorting
  const applySorting = (data: Lead[], sorting: any[]) => {
    if (!sorting.length) return data;
    
    return [...data].sort((a, b) => {
      for (const { id, desc } of sorting) {
        const aValue = a[id as keyof Lead];
        const bValue = b[id as keyof Lead];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }
      return 0;
    });
  };

  // Handle pagination change
  const handlePaginationChange = (newPagination: any) => {
    setPagination({
      pageIndex: newPagination.pageIndex,
      pageSize: newPagination.pageSize,
    });
  };

  // Handle sorting change
  const handleSortingChange = (newSorting: any) => {
    setSorting(newSorting);
  };

  // Handle column filters change
  const handleColumnFiltersChange = (newFilters: any) => {
    setColumnFilters(newFilters);
    // Reset to first page when filters change
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

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
      
      {data && (
        <DataTable
          data={data.rows}
          columns={columns}
          pageCount={data.pageCount}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          onPaginationChange={handlePaginationChange}
          onSortingChange={handleSortingChange}
          onColumnFiltersChange={handleColumnFiltersChange}
        />
      )}
    </div>
  );
};

export default LeadsPage;
