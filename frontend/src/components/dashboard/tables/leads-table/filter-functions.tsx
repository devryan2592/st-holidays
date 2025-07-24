import { Lead } from "@/types/lead";
import { FilterFn, Row } from "@tanstack/react-table";


export const destinationFilterFn: FilterFn<Lead> = (row: Row<Lead>, columnId: string, filterValue: string[]) => {
    if (!filterValue?.length) return true;
    const destinations = row.getValue("destinations") as string[];
    return filterValue.some((dest) => destinations.includes(dest));
}
