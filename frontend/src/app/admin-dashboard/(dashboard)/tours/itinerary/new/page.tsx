'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import PageHeader from '@/components/dashboard/page-header';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import ItineraryForm, { ItineraryFormValues, itineraryFormSchema } from '@/components/dashboard/forms/itinerary-form';
import { defaultValues } from '@/components/dashboard/forms/itinerary-form/types';

export default function NewItineraryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ItineraryFormValues>({
    resolver: zodResolver(itineraryFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ItineraryFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would send this data to your API
      console.log('Form data submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Itinerary created successfully!');
      router.push('/admin-dashboard/tours/itinerary');
    } catch (error) {
      console.error('Error creating itinerary:', error);
      toast.error('Failed to create itinerary. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="Create New Itinerary"
        description="Create a new tour itinerary with day-by-day activities"
      />
      
      <Card className="p-6">
        <ItineraryForm 
          form={form} 
          onSubmit={onSubmit}
          isSubmitting={isSubmitting} 
        />
      </Card>
    </div>
  );
}