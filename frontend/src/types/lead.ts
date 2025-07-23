export interface Lead {
  id: string;
  name: string;
  avatarUrl: string;
  type: 'B2C' | 'B2B';
  status: 'New' | 'Followup' | 'Potential' | 'Positive' | 'Converted' | 'Closed';
  email: string;
  phone: string;
  requirements: {
    flight: boolean;
    hotel: boolean;
    car: boolean;
    other: boolean;
  };
  /** Comma-separated destination names */
  destination: string;
  /** Array of destination names for display */
  destinations: string[];
  bookingType: string;
  travelers: number;
  startDate: string | Date;
  endDate: string | Date;
  /** Formatted budget amount */
  budget: number;
  totalAmount: number;
  assignedTo: string;
  source: string;
  notes: string;
  tags: string[];
  priority: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  // Additional fields from the CRM screenshot
  leadSource?: string;
  travelLocation?: string;
  travelType?: string;
  companyName?: string;
  leadOwner?: string;
  paxDetails?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber: string;
    documents: string[];
  }[];
  flightDetails?: {
    from: string;
    to: string;
    date: string;
    class: string;
    mealPlan: string;
    seatingPreference: string;
    specialRequirements: string;
  }[];
  nextAction?: {
    call?: {
      date: string;
      time: string;
    };
    meet?: {
      date: string;
      time: string;
    };
    task?: {
      date: string;
      time: string;
      description: string;
    };
  };
}
