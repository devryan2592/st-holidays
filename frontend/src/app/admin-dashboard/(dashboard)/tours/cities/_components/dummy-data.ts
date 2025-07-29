import { City } from "./cities-table/columns";

// Function to generate a random city
export const generateCity = (id: string): City => {
  const cityNames = [
    "Venice",
    "Florence",
    "Milan",
    "Naples",
    "Verona",
    "Pisa",
    "Siena",
    "Bologna",
    "Turin",
    "Palermo",
  ];

  const destinations = [
    { id: "destination-1", name: "Italy" },
    { id: "destination-2", name: "France" },
    { id: "destination-3", name: "Japan" },
    { id: "destination-4", name: "United Kingdom" },
    { id: "destination-5", name: "United States" },
  ];

  const name = cityNames[Math.floor(Math.random() * cityNames.length)];
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const destinationIndex = Math.floor(Math.random() * destinations.length);
  const destinationId = destinations[destinationIndex].id;
  const destinationName = destinations[destinationIndex].name;
  
  const descriptions = [
    "A beautiful city with rich history and culture.",
    "Famous for its iconic landmarks and vibrant nightlife.",
    "Known for its amazing cuisine and friendly locals.",
    "A popular tourist destination with stunning architecture.",
    "Home to some of the world's most famous attractions.",
  ];

  return {
    id,
    name,
    slug,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    thumbnail: `https://source.unsplash.com/random/300x200?${slug}`,
    destinationId,
    destinationName,
  };
};

// Generate an array of dummy cities
export const generateDummyCities = (count: number): City[] => {
  return Array.from({ length: count }, (_, i) =>
    generateCity(`city-${i + 1}`)
  );
};

// Export a set of dummy cities
export const dummyCities = generateDummyCities(10);