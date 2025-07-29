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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Destination name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
});

type DestinationFormValues = z.infer<typeof formSchema>;

interface DestinationFormProps {
  // Add your props here
  onSubmit?: (values: DestinationFormValues) => void;
  defaultValues?: Partial<DestinationFormValues>;
}

const DestinationForm: FC<DestinationFormProps> = ({
  onSubmit,
  defaultValues = {
    name: "",
    slug: "",
    description: "",
    thumbnail: "",
  },
}) => {
  const form = useForm<DestinationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: DestinationFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    }
    console.log(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Destination</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the destination.
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
                    <Input placeholder="Enter destination slug" {...field} />
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
                    <Textarea
                      placeholder="Enter destination description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the destination.
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
                    <Input
                      placeholder="Enter thumbnail URL"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL for the destination thumbnail image.
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

export default DestinationForm;