import { z } from "zod";

// Constants for form options
export const TRAVEL_TYPES = [
  { label: "Leisure", value: "leisure" },
  { label: "Business", value: "business" },
  { label: "Group", value: "group" },
  { label: "Corporate", value: "corporate" },
];

export const LEAD_SOURCES = [
  { label: "Website", value: "website" },
  { label: "Referral", value: "referral" },
  { label: "Social Media", value: "social_media" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Walk-in", value: "walk_in" },
];

export const LEAD_TYPES = [
  { label: "B2C", value: "B2C" },
  { label: "B2B", value: "B2B" },
];

export const ACTION_TYPES = [
  { label: "Call", value: "CALL" },
  { label: "Meet", value: "MEET" },
  { label: "Task", value: "TASK" },
  { label: "Note", value: "NOTE" },
  { label: "Status Change", value: "STATUS_CHANGE" },
];

// Passenger details schema
export const passengerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date(),
  passportNumber: z.string().optional(),
  passportIssue: z.date().optional(),
  passportExpiry: z.date().optional(),
  issuingCountry: z.string().optional(),
  documents: z.array(z.string()).default([]),
});

export const activitySchema = z.object({
  type: z.enum(ACTION_TYPES.map((item) => item.value)).default("NOTE"), // CALL, MEET, TASK, NOTE, STATUS_CHANGE
  description: z.string().optional(),
  dateTime: z.date().optional(), // Due date/time for future actions
  isCompleted: z.boolean().default(false),
});

// Lead form schema
export const leadFormSchema = z.object({
  avatar: z.string().optional(),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.email("Invalid email address").optional(),
  leadType: z.enum(LEAD_TYPES.map((item) => item.value)).default("B2C"),
  contactPhone: z.string().optional(),
  companyName: z.string().optional(),
  status: z.enum(["NEW", "FOLLOW_UP", "QUALIFIED", "CLOSED"]).default("NEW"),
  source: z.enum(LEAD_SOURCES.map((item) => item.value)).optional(),
  priority: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  destinations: z.array(z.string()).default([]),
  cities: z.array(z.string()).default([]),
  travelType: z.enum(TRAVEL_TYPES.map((item) => item.value)).optional(),
  startDate: z.date(),
  endDate: z.date(),
  numTravelers: z.number().int().min(1, "At least 1 traveler is required"),
  budget: z.number().min(0, "Budget must be a positive number"),
  // Requirements
  reqFlight: z.boolean().default(false),
  reqHotel: z.boolean().default(false),
  reqCar: z.boolean().default(false),
  reqSightseeing: z.boolean().default(false),
  additionalInfo: z.string().optional(),

  // Relational data
  passengers: z.array(passengerSchema),
  activities: z.array(activitySchema),
});

// Type for form values
export type LeadFormValues = z.infer<typeof leadFormSchema>;
