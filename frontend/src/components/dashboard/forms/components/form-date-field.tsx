'use client'
import { FC } from "react";


import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { CustomCalendar } from "@/components/custom-ui/custom-calendar";
import { Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface FormDateFieldProps {
    // Add your props here
    name: string;
    label: string;
    placeholder: string;
    required: boolean;
    control: Control<any>;
}

const FormDateField: FC<FormDateFieldProps> = ({ name, label, placeholder, required, control }) => {
    const [calendarOpen, setCalendarOpen] = React.useState(false);
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const onCalendarSelect = (date: Date) => {
                    field.onChange(date);
                    setCalendarOpen(false);
                };
                return (
                    <div className="flex flex-col  *:not-first:mt-2">
                        <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-transparent shadow-xs",
                                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                                        "hover:bg-transparent hover:text-foreground hover:border hover:border-ring/50 hover:ring-ring/50 hover:ring-[3px]",
                                        "border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
                                        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

                                        !field.value && "text-muted-foreground"

                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="center">
                                <CustomCalendar required mode="single" selected={field.value} onSelect={onCalendarSelect} />
                            </PopoverContent>
                        </Popover>
                        {fieldState.isTouched && fieldState.error && (
                            <p
                                className="peer-aria-invalid:text-destructive ps-1 text-xs text-red-500"
                                role="alert"
                                aria-live="polite"
                            >{fieldState.error?.message}</p>
                        )}
                    </div>
                );
            }}
        />
    );
};

export default FormDateField;


