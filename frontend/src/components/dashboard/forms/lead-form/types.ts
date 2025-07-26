import { z } from 'zod';

// Define form schema using Zod
export const leadFormSchema = z.object({
  // Personal Information
  type: z.enum(["B2C", "B2B", "B2G"], {
    error: "Please select a lead type",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  companyName: z.string().optional(),

  // Travel Information
  destination: z.string().min(2, { message: "Please enter a destination." }),
  startDate: z.date({ error: "Please select a start date." }),
  endDate: z.date({ error: "Please select an end date." }),
  travelers: z.number().min(1, {
    message: "Number of travelers must be at least 1.",
  }),
  budget: z.number().min(0, {
    message: "Budget cannot be negative.",
  }),
  requirements: z.object({
    flight: z.boolean().default(false),
    hotel: z.boolean().default(false),
    car: z.boolean().default(false),
    other: z.boolean().default(false),
  }),
  leadSource: z.string({
    error: "Please select a lead source.",
  }),
  travelType: z.string({
    error: "Please select a travel type.",
  }),
  notes: z.string().optional(),

  // PAX Details
  paxDetails: z
    .array(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        dateOfBirth: z.date({
          error: () => ({ message: "Please select a date of birth." }),
        }),
        passportNumber: z.string().min(5, {
          message: "Passport number must be at least 5 characters.",
        }),
        documents: z.array(z.string()).default([]),
      })
    )
    .min(1, "At least one passenger is required"),
});

export type LeadFormValues = z.infer<typeof leadFormSchema> & {
  paxDetails: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    passportNumber: string;
    documents: string[];
  }>;
};

// Constants for form options
export const travelTypes = [
  { value: "leisure", label: "Leisure" },
  { value: "business", label: "Business" },
  { value: "family", label: "Family" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "adventure", label: "Adventure" },
];

export const leadSources = [
  { value: "website", label: "Website" },
  { value: "social_media", label: "Social Media" },
  { value: "referral", label: "Referral" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "other", label: "Other" },
];

export const leadTypeOptions = [
  { value: "B2C", label: "B2C (Individual)" },
  { value: "B2B", label: "B2B (Business)" },
  { value: "B2G", label: "B2G (Government)" },
];

// Default values for the form
export const defaultValues: LeadFormValues = {
  type: "B2C",
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  phone: "",
  companyName: "",
  destination: "",
  startDate: new Date(),
  endDate: new Date(),
  travelers: 1,
  budget: 0,
  requirements: {
    flight: false,
    hotel: false,
    car: false,
    other: false,
  },
  leadSource: "",
  travelType: "",
  notes: "",
  paxDetails: [
    {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      passportNumber: "",
      documents: [],
    },
  ],
};