import { Lead } from "@/types/lead";
import {
  TRAVEL_TYPES,
  LEAD_SOURCES,
  LEAD_TYPES,
  ACTION_TYPES,
} from "@/schemas/lead-form-schema";

const FIRST_NAMES = [
  "James",
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "William",
  "Sophia",
  "Elijah",
  "Isabella",
  "Oliver",
  "Mia",
  "Benjamin",
  "Charlotte",
  "Lucas",
  "Amelia",
  "Mason",
  "Harper",
  "Logan",
  "Evelyn",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];

const DESTINATIONS = [
  "Maldives",
  "Bali",
  "Santorini",
  "Paris",
  "Kyoto",
  "New York",
  "Rome",
  "Sydney",
  "Cape Town",
  "Dubai",
  "Barcelona",
  "Tokyo",
  "Rio de Janeiro",
  "Amsterdam",
  "Venice",
  "Bangkok",
  "Vancouver",
  "Prague",
  "Istanbul",
  "Queenstown",
];

const STATUSES = ["NEW", "FOLLOW_UP", "QUALIFIED", "CLOSED"];
const CITIES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Fujairah",
  "Ras Al Khaimah",
  "Umm Al Quwain",
  "Doha",
  "Muscat",
  "Manama",
  "Kuwait City",
  "Riyadh",
  "Jeddah",
];

export const generateLead = (id: number): Lead => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const contactName = `${firstName} ${lastName}`;
  const contactEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const leadType =
    LEAD_TYPES[Math.floor(Math.random() * LEAD_TYPES.length)].value;
  const contactPhone = `+1${Math.floor(
    2000000000 + Math.random() * 8000000000
  )}`;

  // Generate 1-3 random destinations
  const numDestinations = 1 + Math.floor(Math.random() * 3);
  const destinations = [];
  const destPool = [...DESTINATIONS];
  for (let i = 0; i < numDestinations; i++) {
    const idx = Math.floor(Math.random() * destPool.length);
    destinations.push(destPool.splice(idx, 1)[0]);
  }

  // Generate 1-2 random cities
  const numCities = 1 + Math.floor(Math.random() * 2);
  const cities = [];
  const cityPool = [...CITIES];
  for (let i = 0; i < numCities; i++) {
    const idx = Math.floor(Math.random() * cityPool.length);
    cities.push(cityPool.splice(idx, 1)[0]);
  }

  const today = new Date();
  const createdDaysAgo = Math.floor(Math.random() * 90);
  const created = new Date(today);
  created.setDate(today.getDate() - createdDaysAgo);

  const updated = new Date(created);
  updated.setDate(
    created.getDate() + Math.floor(Math.random() * createdDaysAgo)
  );

  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)] as
    | "NEW"
    | "FOLLOW_UP"
    | "QUALIFIED"
    | "CLOSED";
  const travelType =
    TRAVEL_TYPES[Math.floor(Math.random() * TRAVEL_TYPES.length)].value;
  const source =
    LEAD_SOURCES[Math.floor(Math.random() * LEAD_SOURCES.length)].value;
  const tags = [
    "Summer",
    "Winter",
    "Family",
    "Honeymoon",
    "Adventure",
    "Luxury",
    "Budget",
  ];
  const randomTags = [
    ...new Set(
      Array(Math.floor(Math.random() * 3) + 1)
        .fill(0)
        .map(() => tags[Math.floor(Math.random() * tags.length)])
    ),
  ];

  // Generate random start and end dates in the future
  const startDate = new Date(
    Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 180
  );
  const endDate = new Date(
    startDate.getTime() + Math.random() * 1000 * 60 * 60 * 24 * 30
  );

  // Generate random passengers
  const numPassengers = 1 + Math.floor(Math.random() * 4);
  const passengers = [];
  for (let i = 0; i < numPassengers; i++) {
    const passengerFirstName =
      FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const passengerLastName =
      LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const dob = new Date();
    dob.setFullYear(dob.getFullYear() - 20 - Math.floor(Math.random() * 50));

    passengers.push({
      firstName: passengerFirstName,
      lastName: passengerLastName,
      dateOfBirth: dob,
      documents: [],
    });
  }

  // Generate random activities
  const numActivities = Math.floor(Math.random() * 3);
  const activities = [];
  for (let i = 0; i < numActivities; i++) {
    const activityType =
      ACTION_TYPES[Math.floor(Math.random() * ACTION_TYPES.length)].value;
    const activityDate = new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
    );

    activities.push({
      type: activityType,
      description: `Random activity ${i + 1}`,
      dateTime: activityDate,
      isCompleted: Math.random() > 0.5,
    });
  }

  return {
    id: `LD-${1000 + id}`,
    avatar: `https://i.pravatar.cc/150?img=${
      1 + Math.floor(Math.random() * 70)
    }`,
    contactName,
    contactEmail,
    leadType,
    contactPhone,
    companyName: Math.random() > 0.7 ? `${lastName} Enterprises` : undefined,
    status,
    source,
    priority: Math.random() > 0.7, // boolean for priority flag
    tags: randomTags,
    destinations,
    cities,
    travelType,
    startDate,
    endDate,
    numTravelers: numPassengers,
    budget: 1000 + Math.floor(Math.random() * 20000),
    // Requirements
    reqFlight: Math.random() > 0.3,
    reqHotel: Math.random() > 0.2,
    reqCar: Math.random() > 0.5,
    reqSightseeing: Math.random() > 0.4,
    additionalInfo:
      Math.random() > 0.7 ? "Some additional information about this lead." : "",

    // Relational data
    passengers,
    activities,

    // Lead type fields
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
  };
};

export const DUMMY_LEADS: Lead[] = Array.from({ length: 50 }, (_, i) =>
  generateLead(i + 1)
);
