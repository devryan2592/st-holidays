import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormSelectFieldProps {
  // Add your props here
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  classname?: string;
  options: { value: string; label: string }[];
  control: Control<any>;
}

const FormSelectField: FC<FormSelectFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  required,
  options,
  classname,
  control,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={cn(classname)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="ps-1 text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormSelectField;
