import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableFacetedFilter, FacetedFilterOption } from "../../common/data-table/data-table-faceted-filter";


interface LeadTypeFilterProps<TData> {
    table: Table<TData>
}

function LeadTypeFilter<TData>({ table }: LeadTypeFilterProps<TData>) {
    const leadTypeCount = table.getColumn("type")?.getFacetedUniqueValues() || new Map<string, number>();

    console.log(leadTypeCount)

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
        />
    );
}

export default LeadTypeFilter

