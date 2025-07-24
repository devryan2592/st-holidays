import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableFacetedFilter, FacetedFilterOption } from "../../../common/data-table/data-table-faceted-filter";


interface LeadTypeFilterProps<TData> {
    table: Table<TData>;
    disabled?: boolean;
}

function LeadTypeFilter<TData>({ 
    table, 
    disabled = false 
}: LeadTypeFilterProps<TData>) {
    const leadTypeCount = table.getColumn("type")?.getFacetedUniqueValues() || new Map<string, number>();


    const options = useMemo(() => {
        const options: FacetedFilterOption[] = [];
        leadTypeCount.forEach((count, value) => {
            options.push({
                label: value,
                value: value,
                count: count,
            });
        });
        return options;
    }, [leadTypeCount]);
    return (
        <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Lead Type"
            options={options}
            disabled={disabled}
        />
    );
}

export default LeadTypeFilter

