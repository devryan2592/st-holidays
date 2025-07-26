import { FC } from "react";
import LeadForm, { LeadFormValues } from "./lead-form/index";

interface LeadFormWrapperProps {
  onSubmit: (data: LeadFormValues) => Promise<void>;
  defaultValues?: Partial<LeadFormValues>;
  isSubmitting?: boolean;
}

const LeadFormWrapper: FC<LeadFormWrapperProps> = (props) => {
  return <LeadForm {...props} />;
};

export default LeadFormWrapper;
export { type LeadFormValues };
