import { Destination } from "./destinations-table/columns";

// Function to generate a random destination
export const generateDestination = (id: string): Destination => {
  const names = [
    "Paris",
    "Tokyo",
    "New York",
    "London",
    "Rome",
    "Sydney",
    "Barcelona",
    "Dubai",
    "Singapore",
    "Amsterdam",
  ];

  const name = names[Math.floor(Math.random() * names.length)];
  const slug = name.toLowerCase().replace(/\s+/g, "-");
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
  };
};

// Generate an array of dummy destinations
export const generateDummyDestinations = (count: number): Destination[] => {
  return Array.from({ length: count }, (_, i) =>
    generateDestination(`destination-${i + 1}`)
  );
};

// Export a set of dummy destinations
export const dummyDestinations = generateDummyDestinations(20);
