import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC } from "react";
import { Control } from "react-hook-form";

interface FormCheckboxFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  control: Control<any>;
}

const FormCheckboxField: FC<FormCheckboxFieldProps> = ({
  name,
  label,
  placeholder,
  required,
  control,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex items-center">
            <FormControl>
              <Checkbox {...field} key={name} value={name}>
                {placeholder}
              </Checkbox>
            </FormControl>
            <FormLabel className="text-sm font-normal  capitalize">
              {label}
            </FormLabel>
            <FormMessage className="ps-1 text-xs text-red-500" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormCheckboxField;
