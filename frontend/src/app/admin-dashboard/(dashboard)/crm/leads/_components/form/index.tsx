"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { leadFormSchema, type LeadFormValues } from "@/schemas/lead-form-schema";
import LeadType from "./sections/lead-type";
import PersonalInformation from "./sections/personal-information";
import TravelInformation from "./sections/travel-information";
import PassengerDetails from "./sections/passenger-details";
import FormActions from "./sections/form-actions";

export interface LeadFormProps {
  onSubmit: (data: LeadFormValues) => void;
  defaultValues?: Partial<LeadFormValues>;
  isSubmitting?: boolean;
}

const LeadForm: FC<LeadFormProps> = ({
  onSubmit,
  defaultValues,
  isSubmitting = false,
}) => {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: defaultValues as LeadFormValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <LeadType control={form.control} />
          <PersonalInformation control={form.control} watch={form.watch} />
          <TravelInformation control={form.control} />
          <PassengerDetails
            control={form.control}
            isSubmitting={isSubmitting}
          />
        </div>
        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default LeadForm;