import HTTP_STATUS from "@/constants/http-status";

// Type for HTTP status values
export type HttpStatusType = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

// Interface for API response structure
export interface ApiResponse<T = any> {
  status: "success" | "error";
  message: string;
  data?: T;
  errors?: string[];
}
