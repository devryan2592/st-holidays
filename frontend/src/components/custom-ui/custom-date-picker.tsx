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
import { CustomCalendar } from "./custom-calendar";



interface CustomDatePickerProps {
    // Add your props here
    children?: React.ReactNode;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({ children }) => {
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <CustomCalendar mode="single" selected={date} onSelect={setDate} autoFocus />
            </PopoverContent>
        </Popover>
    );
};

export default CustomDatePicker;


