import { Lead } from "@/types/lead";

const FIRST_NAMES = [
  "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Elijah", "Isabella",
  "Oliver", "Mia", "Benjamin", "Charlotte", "Lucas", "Amelia", "Mason", "Harper", "Logan", "Evelyn"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
];

const DESTINATIONS = [
  "Maldives", "Bali", "Santorini", "Paris", "Kyoto", "New York", "Rome", "Sydney", "Cape Town", "Dubai",
  "Barcelona", "Tokyo", "Rio de Janeiro", "Amsterdam", "Venice", "Bangkok", "Vancouver", "Prague", "Istanbul", "Queenstown"
];

const LEAD_TYPES = ["B2C", "B2B"];
const STATUSES = ["New", "Followup", "Potential", "Positive", "Converted", "Closed"];
const ASSIGNED_TO = ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson"];

export const generateLead = (id: number): Lead => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const phone = `+1${Math.floor(2000000000 + Math.random() * 8000000000)}`;
  
  // Generate 1-3 random destinations
  const numDestinations = 1 + Math.floor(Math.random() * 3);
  const destinations = [];
  const destPool = [...DESTINATIONS];
  for (let i = 0; i < numDestinations; i++) {
    const idx = Math.floor(Math.random() * destPool.length);
    destinations.push(destPool.splice(idx, 1)[0]);
  }
  
  const today = new Date();
  const createdDaysAgo = Math.floor(Math.random() * 90);
  const created = new Date(today);
  created.setDate(today.getDate() - createdDaysAgo);
  
  const updated = new Date(created);
  updated.setDate(created.getDate() + Math.floor(Math.random() * createdDaysAgo));
  
  const type = LEAD_TYPES[Math.floor(Math.random() * LEAD_TYPES.length)] as 'B2C' | 'B2B';
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)] as 'New' | 'Followup' | 'Potential' | 'Positive' | 'Converted' | 'Closed';
  const priority = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High';
  const sources = ['Website', 'Referral', 'Social Media', 'Email', 'Phone', 'Walk-in'];
  const tags = ['Summer', 'Winter', 'Family', 'Honeymoon', 'Adventure', 'Luxury', 'Budget'];
  const randomTags = [...new Set(Array(Math.floor(Math.random() * 3) + 1).fill(0).map(() => tags[Math.floor(Math.random() * tags.length)]))];

  return {
    id: `LD-${1000 + id}`,
    name,
    email,
    phone,
    type,
    status,
    requirements: {
      flight: Math.random() > 0.3,
      hotel: Math.random() > 0.2,
      car: Math.random() > 0.5,
      other: Math.random() > 0.7
    },
    destination: destinations.join(", "),
    destinations,
    bookingType: ['Leisure', 'Business', 'Group', 'Corporate'][Math.floor(Math.random() * 4)],
    source: sources[Math.floor(Math.random() * sources.length)],
    tags: randomTags,
    priority,
    travelers: 1 + Math.floor(Math.random() * 8),
    startDate: new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 180).toISOString(),
    endDate: new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 210).toISOString(),
    budget: 1000 + Math.floor(Math.random() * 20000),
    totalAmount: 0, // Kept for backward compatibility
    assignedTo: ASSIGNED_TO[Math.floor(Math.random() * ASSIGNED_TO.length)],
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
    notes: "",
    avatarUrl: `https://i.pravatar.cc/150?img=${1 + Math.floor(Math.random() * 70)}`,
  };
};

export const DUMMY_LEADS: Lead[] = Array.from({ length: 50 }, (_, i) => generateLead(i + 1));
