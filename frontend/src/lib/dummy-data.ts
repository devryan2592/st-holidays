import { Item } from "@/components/dashboard/tables/itinerary-table";

export const dummyItems: Item[] = Array.from({ length: 50 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item Name ${i + 1}`,
  email: `item${i + 1}@example.com`,
  location: `Location ${i + 1}`,
  flag: `Flag ${i + 1}`,
  status: (["Active", "Inactive", "Pending"] as const)[i % 3],
  balance: parseFloat((Math.random() * 1000).toFixed(2)),
}));