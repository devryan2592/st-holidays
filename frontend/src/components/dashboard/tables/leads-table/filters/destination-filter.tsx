import { FC, useMemo } from "react";
import { DataTableFacetedFilter, FacetedFilterOption } from "../../common/data-table/data-table-faceted-filter";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}


function DestinationFilter<TData>({ table }: DataTableToolbarProps<TData>) {
    const destinationCount = useMemo(() => {
        const destinationColumn = table.getColumn("destinations");
        if (!destinationColumn) return new Map<string, number>();

        const uniqueValues = Array.from(
            destinationColumn.getFacetedUniqueValues().keys()
        ) as string[];

        let destinationArray: string[] = [];
        Object.values(uniqueValues).forEach((key) => {
            destinationArray.push(...key);
        });

        const counts = new Map<string, number>();
        destinationArray.forEach((dest) => {
            counts.set(dest, destinationArray.filter((d) => d === dest).length);
        });

        return counts;
    }, [table.getColumn("destinations")?.getFacetedUniqueValues()]);

    const options = useMemo(() => {
        const options: FacetedFilterOption[] = [];
        destinationCount.forEach((count, value) => {
            options.push({
                label: value,
                value: value,
                count: count,
            });
        });
        return options;
    }, [destinationCount]);

    return (
        <DataTableFacetedFilter options={options} title="Destination" column={table.getColumn("destinations")}/>
    );
};

export default DestinationFilter;
