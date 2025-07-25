"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import LeadForm, { type LeadFormValues } from '@/components/dashboard/forms/lead-form';
import PageHeader from '@/components/dashboard/page-header';

const NewLeadPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<LeadFormValues> = {
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

  const handleSubmit = async (data: LeadFormValues) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      toast.success('Lead created successfully');

      // Redirect to leads list
      router.push('/admin-dashboard/crm/leads');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to create lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="New Lead"
        description="Create a new lead with all the necessary information"
      />

      <LeadForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default NewLeadPage;
