import { FC } from "react";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import FormInputField from "../../components/form-input-field";
import FormDateField from "../../components/form-date-field";
import FormSelectField from "../../components/form-select-field";
import FormCheckboxField from "../../components/form-checkbox-field";
import FormTextAreaField from "../../components/form-text-area-field";
import { LeadFormValues, leadSources, TRAVEL_TYPES } from "../types";

interface TravelInformationProps {
  control: Control<LeadFormValues>;
}

const TravelInformation: FC<TravelInformationProps> = ({ control }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInputField
            name="destination"
            label="Destination"
            type="text"
            placeholder="Destination"
            required={true}
            control={control}
          />

          <FormSelectField
            name="travelType"
            label="Travel Type"
            placeholder="Select travel type"
            control={control}
            classname="col-span-1 w-full max-w-[250px]"
            options={TRAVEL_TYPES}
          />

          <FormDateField
            name="startDate"
            label="Start Date"
            placeholder="Start Date"
            required={true}
            control={control}
          />
          <FormDateField
            name="endDate"
            label="End Date"
            placeholder="End Date"
            required={true}
            control={control}
          />

          <FormInputField
            name="budget"
            label="Budget (USD)"
            type="number"
            placeholder="Enter budget"
            required={true}
            control={control}
            price={true}
          />

          <FormInputField
            name="travelers"
            label="Number of Travelers"
            type="number"
            placeholder="Number of Travelers"
            required={true}
            control={control}
          />

          <FormSelectField
            name="leadSource"
            label="Lead Source"
            placeholder="Select Lead Source"
            control={control}
            classname="col-span-1 w-full max-w-[250px]"
            options={leadSources}
          />

          <div className="col-span-2">
            <FormLabel className="text-sm font-medium">Requirements</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {["flight", "hotel", "car", "other"].map((req) => (
                <FormCheckboxField
                  key={req}
                  name={`requirements.${
                    req as keyof LeadFormValues["requirements"]
                  }`}
                  label={req}
                  placeholder={req}
                  required={true}
                  control={control}
                />
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <FormTextAreaField
              name="notes"
              label="Additional Notes"
              placeholder="Any additional information or special requirements"
              required={true}
              control={control}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelInformation;
