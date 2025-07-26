import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";
import { Control } from "react-hook-form";

interface FormTextAreaFieldProps {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  control: Control<any>;
}

const FormTextAreaField: FC<FormTextAreaFieldProps> = ({
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
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage className="ps-1 text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormTextAreaField;
