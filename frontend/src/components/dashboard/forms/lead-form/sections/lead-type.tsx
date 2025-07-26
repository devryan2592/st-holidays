import { FC } from "react";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSelectField from "../../components/form-select-field";
import { LeadFormValues, leadTypeOptions } from "../types";

interface LeadTypeProps {
  control: Control<LeadFormValues>;
}

const LeadType: FC<LeadTypeProps> = ({ control }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelectField
            name="type"
            label="Lead Type"
            placeholder="Select lead type"
            control={control}
            classname="col-span-1 w-full max-w-[250px]"
            options={leadTypeOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadType;