import { z } from "zod";

/**
 * Enum for meal types
 */
export const MealsEnum = z.enum(["BREAKFAST", "LUNCH", "DINNER"]);

/**
 * Schema for day itinerary items
 */
export const dayItineraryItemSchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z.array(z.string()).optional(),
  meals: z.array(MealsEnum).optional(),
  duration: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().optional(),
});

/**
 * Schema for validating itinerary form input
 */
export const itineraryFormSchema = z.object({
  // Tour basic information
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  featured: z.boolean(),
  duration: z
    .number()
    .int()
    .positive({ message: "Duration must be a positive number" }),
  category: z.string().optional(),
  packageType: z.string().optional(),
  price: z.number().positive({ message: "Price must be a positive number" }),
  offerPrice: z.number().positive().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()),

  // Additional information
  highlights: z.array(
    z.object({
      text: z.string(),
    })
  ),
  inclusions: z.array(
    z.object({
      text: z.string(),
    })
  ),
  exclusions: z.array(
    z.object({
      text: z.string(),
    })
  ),
  terms: z.array(
    z.object({
      text: z.string(),
    })
  ),

  // Destination and cities
  destinationId: z.string({ error: "Destination is required" }),
  cityIds: z.array(z.string()),

  // Day itinerary items
  dayItineraryItems: z.array(dayItineraryItemSchema),
});

// Default values for the form
export const defaultValues = {
  name: "",
  description: "",
  featured: false,
  duration: 1,
  category: "",
  packageType: "",
  price: 0,
  offerPrice: 0,
  thumbnail: "",
  images: [],
  highlights: [],
  inclusions: [],
  exclusions: [],
  terms: [],
  destinationId: "",
  cityIds: [],
  dayItineraryItems: [
    {
      dayNumber: 1,
      title: "",
      description: "",
      images: [],
      meals: [],
      duration: 1,
      order: 0,
    },
  ],
};

// Form value type
export type ItineraryFormValues = z.infer<typeof itineraryFormSchema>;

// Constants for form options
export const PACKAGE_TYPES = [
  { label: "Standard", value: "standard" },
  { label: "Premium", value: "premium" },
  { label: "Luxury", value: "luxury" },
];

export const CATEGORIES = [
  { label: "Adventure", value: "adventure" },
  { label: "Beach", value: "beach" },
  { label: "City Break", value: "city-break" },
  { label: "Cultural", value: "cultural" },
  { label: "Family", value: "family" },
  { label: "Honeymoon", value: "honeymoon" },
  { label: "Safari", value: "safari" },
  { label: "Ski", value: "ski" },
];

export const MEAL_OPTIONS = [
  { label: "Breakfast", value: "BREAKFAST" },
  { label: "Lunch", value: "LUNCH" },
  { label: "Dinner", value: "DINNER" },
];
