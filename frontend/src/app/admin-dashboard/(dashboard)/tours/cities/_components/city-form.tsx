"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "City name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  destinationId: z.string({
    error: "Please select a destination.",
  }),
});

type CityFormValues = z.infer<typeof formSchema>;

interface CityFormProps {
  // Add your props here
  onSubmit?: (values: CityFormValues) => void;
  defaultValues?: Partial<CityFormValues>;
  destinations?: { id: string; name: string }[];
}

const CityForm: FC<CityFormProps> = ({
  onSubmit,
  defaultValues = {
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
    destinationId: "",
  },
  destinations = [
    { id: "destination-1", name: "Paris" },
    { id: "destination-2", name: "Tokyo" },
    { id: "destination-3", name: "New York" },
    { id: "destination-4", name: "London" },
    { id: "destination-5", name: "Rome" },
  ],
}) => {
  const form = useForm<CityFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: CityFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    }
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New City</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the city.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the URL-friendly version of the name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter city description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the city.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destinationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem key={destination.id} value={destination.id}>
                          {destination.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The destination this city belongs to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter thumbnail URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL for the city thumbnail image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CityForm;
