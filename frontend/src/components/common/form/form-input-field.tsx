import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AtSignIcon } from "lucide-react";
import { LeadFormValues } from "../../dashboard/forms/lead-form";

interface FormInputFieldProps {
  // Add your props here
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  min?: number;
  max?: number;
  price?: boolean;
  control: Control<any>;
}

const FormInputField: FC<FormInputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  required,
  min,
  max,
  price,
  control,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel htmlFor={name} className="text-sm font-medium">
              {label}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  id={name}
                  {...field}
                  type={type}
                  placeholder={placeholder}
                  required={required}
                  min={min}
                  max={max}
                  onChange={(e) => {
                    if (type === "number") {
                      const value = e.target.value;
                      const parsedValue = Number(value);
                      field.onChange(parsedValue);
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                  className={cn(
                    "",
                    type === "email" && "peer ps-9 items-center",
                    price && "peer ps-7 pe-12"
                  )}
                />
                {type === "email" && (
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <AtSignIcon size={16} aria-hidden="true" />
                  </div>
                )}
                {price && (
                  <span className=" text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3  peer-disabled:opacity-50">
                    $
                  </span>
                )}
                {price && (
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
                    USD
                  </span>
                )}
              </div>
            </FormControl>
            <FormMessage className="ps-1 text-xs text-red-500" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInputField;
