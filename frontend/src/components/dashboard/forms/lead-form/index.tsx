import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { LeadFormValues, defaultValues, leadFormSchema } from "./types";
import LeadType from "./sections/lead-type";
import PersonalInformation from "./sections/personal-information";
import TravelInformation from "./sections/travel-information";
import PassengerDetails from "./sections/passenger-details";
import FormActions from "./sections/form-actions";

interface LeadFormProps {
  onSubmit: (data: LeadFormValues) => Promise<void>;
  defaultValues?: Partial<LeadFormValues>;
  isSubmitting?: boolean;
}

const LeadForm: FC<LeadFormProps> = ({
  onSubmit,
  defaultValues: propDefaultValues,
  isSubmitting: propIsSubmitting = false,
}) => {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema) as any, // Type assertion to handle zod resolver type issues
    defaultValues: propDefaultValues || defaultValues,
    mode: "onChange",
  });

  const { control, handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  console.log("LeadForm", form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <LeadType control={control} />
        <PersonalInformation control={control} />
        <TravelInformation control={control} />
        <PassengerDetails control={control} isSubmitting={isSubmitting} />
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default LeadForm;
export { leadFormSchema, type LeadFormValues };