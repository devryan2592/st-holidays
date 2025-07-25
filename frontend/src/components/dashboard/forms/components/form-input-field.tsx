import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AtSignIcon } from "lucide-react";
import { LeadFormValues } from "../lead-form";


interface FormInputFieldProps {
    // Add your props here
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    min?: number;
    max?: number;
    control: Control<any>;
}

const FormInputField: FC<FormInputFieldProps> = ({ name, label, type, placeholder, required, min, max, control }) => {

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                return (
                    <div className="flex flex-col  *:not-first:mt-2">
                        <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
                        <div className="relative">
                            <Input
                                id={name}
                                {...field}
                                type={type}
                                placeholder={placeholder}
                                required={required}
                                min={min}
                                max={max}
                                onChange={e => {
                                    if (type === "number") {
                                        const value = e.target.value;
                                        const parsedValue = Number(value);
                                        field.onChange(parsedValue);
                                    } else {
                                        field.onChange(e.target.value);
                                    }
                                }}
                                className={cn('',
                                    type === "email" && "peer ps-9 items-center"
                                )}
                            />
                            {type === "email" && <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <AtSignIcon size={16} aria-hidden="true" />
                            </div>}
                        </div>
                        {fieldState.isTouched && fieldState.error && (
                            <p
                                className="peer-aria-invalid:text-destructive ps-1 text-xs text-red-500"
                                role="alert"
                                aria-live="polite"
                            >{fieldState.error?.message}</p>
                        )}
                    </div>
                )
            }}
        />
    );
};

export default FormInputField;
