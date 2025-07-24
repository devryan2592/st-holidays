import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableFacetedFilter, FacetedFilterOption } from "../../common/data-table/data-table-faceted-filter";

interface StatusFilterProps<TData> {
    table: Table<TData>

}

function StatusFilter<TData>({ table }: StatusFilterProps<TData>) {
    const statusCount = table.getColumn("status")?.getFacetedUniqueValues() || new Map<string, number>();

    const options = useMemo(() => {
        const options: FacetedFilterOption[] = [];
        statusCount.forEach((count, value) => {
            options.push({
                label: value,
                value: value,
                count: count,
            });
        });
        return options;
    }, [statusCount]);
    return (
        <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={options}
        />
    );
};

export default StatusFilter;
