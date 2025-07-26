import { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormInputField from "../../components/form-input-field";
import { LeadFormValues } from "../types";

interface PersonalInformationProps {
  control: Control<LeadFormValues>;
}

const PersonalInformation: FC<PersonalInformationProps> = ({ control }) => {
  const leadType = useWatch({
    control,
    name: "type",
    defaultValue: "B2C",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {(leadType === "B2B" || leadType === "B2G") && (
            <FormInputField
              name="companyName"
              label={leadType === "B2G" ? "Government Agency" : "Company Name"}
              type="text"
              placeholder={leadType === "B2G" ? "Government Agency" : "Company Name"}
              required={true}
              control={control}
            />
          )}

          <FormInputField
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            required={true}
            control={control}
          />
          <FormInputField
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            required={true}
            control={control}
          />
          <FormInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            required={true}
            control={control}
          />
          <FormInputField
            name="phone"
            label="Phone"
            type="tel"
            placeholder="Phone"
            required={true}
            control={control}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;