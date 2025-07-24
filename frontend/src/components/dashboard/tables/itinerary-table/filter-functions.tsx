import { Item } from "@/lib/dummy-data";
import { FilterFn, Row } from "@tanstack/react-table";


export const destinationFilterFn: FilterFn<Item> = (row: Row<Item>, columnId: string, filterValue: string[]) => {
    if (!filterValue?.length) return true;
    const destinations = row.getValue("destinations") as string[];
    return filterValue.some((dest) => destinations.includes(dest));
}

export const durationRanges: { [key: string]: [number, number | undefined] } = {
    "1-3 days": [1, 3],
    "4-6 days": [4, 6],
    "7-10 days": [7, 10],
    "10+ days": [11, undefined],
};

export const durationFilterFn: FilterFn<Item> = (
    row,
    columnId,
    filterValue: string[]
) => {
    if (!filterValue?.length) return true;
    const duration = row.getValue(columnId) as number;

    const durationFilter = filterValue.some((rangeKey) => {
        const range = durationRanges[rangeKey];
        if (!range) return false;
        const [min, max] = range;
        return duration >= min && (max === undefined || duration <= max);
    });

    return durationFilter;
};

export const priceFilterFn: FilterFn<Item> = (
    row,
    columnId,
    filterValue: [number, number]
) => {
    // Min Max Price
    const price = row.getValue(columnId) as number;
    const [min, max] = filterValue;
    return price >= min && price <= max;
};