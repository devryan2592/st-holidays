import { FC, useEffect } from "react";
import { useState } from 'react';
import { useForm, useFieldArray, Control, useFormState, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import FormInputField from "./components/form-input-field";
import FormDateField from "./components/form-date-field";
import CustomDatePicker from "@/components/custom-ui/custom-date-picker";
import { Calendar } from "@/components/ui/calendar";

// Constants for form options
const travelTypes = [
    { value: 'leisure', label: 'Leisure' },
    { value: 'business', label: 'Business' },
    { value: 'family', label: 'Family' },
    { value: 'honeymoon', label: 'Honeymoon' },
    { value: 'adventure', label: 'Adventure' },
];

const leadSources = [
    { value: 'website', label: 'Website' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'referral', label: 'Referral' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'other', label: 'Other' },
];

// Default values for the form
const defaultValues: LeadFormValues = {
    type: 'B2C',
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phone: '',
    companyName: '',
    destination: '',
    startDate: new Date(),
    endDate: new Date(),
    travelers: 1,
    budget: 0,
    requirements: {
        flight: false,
        hotel: false,
        car: false,
        other: false,
    },
    leadSource: '',
    travelType: '',
    notes: '',
    paxDetails: [
        {
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            passportNumber: '',
            documents: [],
        },
    ],
};

// Define form schema using Zod
export const leadFormSchema = z.object({
    // Personal Information
    type: z.enum(['B2C', 'B2B'], {
        error: 'Please select a lead type',
    }),
    firstName: z.string().min(2, {
        message: 'First name must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Last name must be at least 2 characters.',
    }),
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    phone: z.string().min(10, {
        message: 'Phone number must be at least 10 digits.',
    }),
    companyName: z.string().optional(),

    // Travel Information
    destination: z.string().min(2, { message: 'Please enter a destination.' }),
    startDate: z.date({ error: 'Please select a start date.' }),
    endDate: z.date({ error: 'Please select an end date.' }),
    travelers: z.number().min(1, {
        message: 'Number of travelers must be at least 1.',
    }),
    budget: z.number().min(0, {
        message: 'Budget cannot be negative.',
    }),
    requirements: z.object({
        flight: z.boolean().default(false),
        hotel: z.boolean().default(false),
        car: z.boolean().default(false),
        other: z.boolean().default(false),
    }),
    leadSource: z.string({
        error: 'Please select a lead source.',
    }),
    travelType: z.string({
        error: 'Please select a travel type.',
    }),
    notes: z.string().optional(),

    // PAX Details
    paxDetails: z.array(
        z.object({
            firstName: z.string().min(1, 'First name is required'),
            lastName: z.string().min(1, 'Last name is required'),
            dateOfBirth: z.date({
                error: () => ({ message: 'Please select a date of birth.' }),
            }),
            passportNumber: z.string().min(5, {
                message: 'Passport number must be at least 5 characters.',
            }),
            documents: z.array(z.string()).default([]),
        })
    ).min(1, 'At least one passenger is required'),
});

export type LeadFormValues = z.infer<typeof leadFormSchema> & {
    paxDetails: Array<{
        firstName: string;
        lastName: string;
        dateOfBirth: Date;
        passportNumber: string;
        documents: string[];
    }>;
};

// Type for form field props
type FormFieldProps = {
    name: keyof LeadFormValues | `paxDetails.${number}.${string}`;
    control: Control<LeadFormValues>;
    label: string;
    children: (props: { field: any; fieldState: any }) => React.ReactNode;
    [key: string]: any;
};


interface LeadFormProps {
    onSubmit: (data: LeadFormValues) => Promise<void>;
    defaultValues?: Partial<LeadFormValues>;
    isSubmitting?: boolean;
}

const LeadForm: FC<LeadFormProps> = ({
    onSubmit,
    defaultValues: propDefaultValues,
    isSubmitting: propIsSubmitting = false,
}: LeadFormProps) => {
    // const [isSubmitting, setIsSubmitting] = useState(propIsSubmitting || false);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema) as any, // Type assertion to handle zod resolver type issues
        defaultValues: propDefaultValues || defaultValues,
        mode: 'onChange',
    });

    const { control, handleSubmit, formState, setValue, watch } = form;
    const { isSubmitting } = formState;
    const leadType = useWatch({
        control,
        name: 'type',
        defaultValue: 'B2C',
    });

    const paxDetails = useWatch({
        control,
        name: 'paxDetails',
        defaultValue: [{
            firstName: '',
            lastName: '',
            dateOfBirth: new Date(),
            passportNumber: '',
            documents: [],
        }],
    });



    const { fields, append, remove } = useFieldArray({
        control,
        name: 'paxDetails',
    });

    // useEffect(() => {
    //     if (propIsSubmitting !== undefined) {
    //         setIsSubmitting(propIsSubmitting);
    //     }
    // }, [propIsSubmitting]);

    const handleFormSubmit = async (data: LeadFormValues) => {
        // try {
        //     setIsSubmitting(true);

        //     // Validate the form before submission
        //     const isFormValid = await trigger();
        //     if (!isFormValid) {
        //         console.error('Form validation failed');
        //         return;
        //     }

        //     if (onSubmit) {
        //         await onSubmit(data);
        //     }
        // } catch (error) {
        //     console.error('Error submitting form:', error);
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    // const addPassenger = () => {
    //     const currentPax = getValues('paxDetails') || [];
    //     setValue('paxDetails', [
    //         ...currentPax,
    //         {
    //             firstName: '',
    //             lastName: '',
    //             dateOfBirth: new Date(),
    //             passportNumber: '',
    //             documents: [],
    //         },
    //     ]);
    // };

    // const removePassenger = (index: number) => {
    //     const currentPax = getValues('paxDetails') || [];
    //     if (currentPax.length <= 1) return;
    //     const updatedPax = [...currentPax];
    //     updatedPax.splice(index, 1);
    //     setValue('paxDetails', updatedPax);
    // };


    console.log("LeadForm", form.getValues())

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Lead Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={control}
                                name="type"

                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Lead Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select lead type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="B2C">B2C (Individual)</SelectItem>
                                                <SelectItem value="B2B">B2B (Business)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
                {/* Personal Information Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {leadType === 'B2B' && (
                                <FormInputField name="companyName" label="Company Name" type="text" placeholder="Company Name" required={true} control={control} />
                            )}

                            <FormInputField name="firstName" label="First Name" type="text" placeholder="First Name" required={true} control={control} />
                            <FormInputField name="lastName" label="Last Name" type="text" placeholder="Last Name" required={true} control={control} />
                            <FormInputField name="email" label="Email" type="email" placeholder="Email" required={true} control={control} />
                            <FormInputField name="phone" label="Phone" type="tel" placeholder="Phone" required={true} control={control} />

                        </div>
                    </CardContent>
                </Card>

                {/* Travel Information Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Travel Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInputField name="destination" label="Destination" type="text" placeholder="Destination" required={true} control={control} />

                            <FormField
                                control={control}
                                name="travelType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Travel Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select travel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {travelTypes.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
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

                            <FormField
                                control={control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget (USD)</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    placeholder="Enter budget"
                                                    className="pl-7"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormInputField
                                name="travelers"
                                label="Number of Travelers"
                                type="number"
                                placeholder="Number of Travelers"
                                required={true}
                                control={control}
                            />



                            <FormField
                                control={control}
                                name="leadSource"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lead Source</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select lead source" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {leadSources.map((source) => (
                                                    <SelectItem key={source.value} value={source.value}>
                                                        {source.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="col-span-2">
                                <FormLabel>Requirements</FormLabel>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                    {['flight', 'hotel', 'car', 'other'].map((req) => (
                                        <FormField
                                            key={req}
                                            control={control}
                                            name={`requirements.${req as keyof LeadFormValues['requirements']}`}
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="!mt-0 capitalize">{req}</FormLabel>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <FormField
                                    control={control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Any additional information or special requirements"
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Passenger Details Section */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Passenger Details</CardTitle>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            // onClick={addPassenger}
                            disabled={isSubmitting}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Passenger
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {paxDetails.map((pax, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4 relative">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium">Passenger {index + 1}</h4>
                                    {paxDetails.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            // onClick={() => removePassenger(index)}
                                            disabled={isSubmitting}
                                            className="text-destructive hover:text-destructive/90"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={control}
                                        name={`paxDetails.${index}.firstName`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="First name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name={`paxDetails.${index}.lastName`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Last name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name={`paxDetails.${index}.dateOfBirth`}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date of Birth</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    'pl-3 text-left font-normal',
                                                                    !field.value && 'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, 'PPP')
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        {/* <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        /> */}
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={control}
                                        name={`paxDetails.${index}.passportNumber`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passport Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Passport number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Lead'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}


export default LeadForm;
