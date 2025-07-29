import { LeadFormValues } from "@/schemas/lead-form-schema";

export type Lead = LeadFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// Define the type for our query data
export type LeadsQueryData = {
  data: Lead[];
};
