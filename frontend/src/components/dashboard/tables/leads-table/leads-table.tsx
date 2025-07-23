"use client"

import * as React from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Lead } from "@/types/lead"
import { leads } from "./dummy-leads" // Import dummy data

interface LeadsTableProps {
  initialData?: Lead[]
}

export function LeadsTable({ initialData = [] }: LeadsTableProps) {
  const [data, setData] = React.useState<Lead[]>(initialData.length ? initialData : leads)

  // In a real app, you would fetch data here
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/leads')
  //     const data = await response.json()
  //     setData(data)
  //   }
  //   fetchData()
  // }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Manage your leads and track their status
          </p>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  )
}
