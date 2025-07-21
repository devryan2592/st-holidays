// Image, Name with desc, Destinations, duration, price, actions

export type Item = {
  id: string;
  image: string;
  name: string;
  description: string;
  destinations: string[];
  duration: number;
  actual_price: number;
  offer_price: number;
  status: "Published" | "Internal" | "Draft";
};

export const dummyItems: Item[] = Array.from({ length: 50 }, (_, i) => ({
  id: `item-${i + 1}`,
  image: `https://picsum.photos/200/100?random=${i}`,
  name: `Item Name ${i + 1}`,
  description: `Item Description lorem ipsum dolor sit amet consectetur adipisicing elit. Item Description lorem ipsum dolor sit amet consectetur adipisicing elit. ${
    i + 1
  }`,
  destinations: [`Thailand`, `Singapore`, `Malaysia`],
  duration: parseFloat(`${Math.floor(Math.random() * 20) + 1}`), // From 1 to 100 days
  actual_price: parseFloat((Math.random() * 1000).toFixed(2)),
  offer_price: parseFloat((Math.random() * 1000).toFixed(2)),
  status: (["Published", "Internal", "Draft"] as const)[i % 3],
}));
