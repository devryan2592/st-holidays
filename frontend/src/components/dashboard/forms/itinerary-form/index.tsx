import { FC } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ItineraryFormValues,
  defaultValues,
  itineraryFormSchema,
} from "./types";
import BasicInformation from "./sections/basic-information";
import AdditionalInformation from "./sections/additional-information";
import LocationInformation from "./sections/location-information";
import DayItineraryItems from "./sections/day-itinerary-items";
import FormActions from "./sections/form-actions";

interface ItineraryFormProps {
  onSubmit?: (data: ItineraryFormValues) => Promise<void>;
  defaultValues?: Partial<ItineraryFormValues>;
  isSubmitting?: boolean;
  form?: UseFormReturn<ItineraryFormValues>;
}

const ItineraryForm: FC<ItineraryFormProps> = ({
  onSubmit,
  defaultValues: propDefaultValues,
  isSubmitting: propIsSubmitting = false,
  form: propForm,
}) => {
  const form =
    propForm ||
    useForm<ItineraryFormValues>({
      resolver: zodResolver(itineraryFormSchema), // Type assertion to handle zod resolver type issues
      defaultValues: propDefaultValues || defaultValues,
      mode: "onChange",
    });

  const { control, handleSubmit, formState } = form;
  const { isSubmitting = propIsSubmitting } = formState;

  console.log(form.getValues());
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
        className="space-y-8"
      >
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="itinerary">Day Itinerary</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <BasicInformation control={control} isSubmitting={isSubmitting} />
          </TabsContent>

          <TabsContent value="additional" className="mt-6">
            <AdditionalInformation
              control={control}
              isSubmitting={isSubmitting}
            />
          </TabsContent>

          <TabsContent value="location" className="mt-6">
            <LocationInformation
              control={control}
              isSubmitting={isSubmitting}
            />
          </TabsContent>

          <TabsContent value="itinerary" className="mt-6">
            <DayItineraryItems control={control} isSubmitting={isSubmitting} />
          </TabsContent>
        </Tabs>

        <FormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default ItineraryForm;
export { itineraryFormSchema, type ItineraryFormValues };
