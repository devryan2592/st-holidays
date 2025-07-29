"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import LeadForm, { type LeadFormValues } from '@/app/admin-dashboard/(dashboard)/crm/leads/_components/form';
import PageHeader from '@/components/dashboard/page-header';
import { LoadingSpinner } from '@/components/common-ui/loading-spinner';
import { ErrorDisplay } from '@/components/common-ui/error-display';
import { DUMMY_LEADS } from '@/lib/dummy-data/leads';

interface EditLeadPageProps {
  params: {
    id: string;
  };
}

const EditLeadPage = ({ params }: EditLeadPageProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lead, setLead] = useState<LeadFormValues | null>(null);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, you would fetch the lead from an API
        // For now, we'll simulate a network delay and use the dummy data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundLead = DUMMY_LEADS.find(lead => lead.id === params.id);
        
        if (!foundLead) {
          throw new Error(`Lead with ID ${params.id} not found`);
        }
        
        // Convert the lead data to the format expected by the form
        const formValues: LeadFormValues = {
          type: foundLead.type,
          firstName: foundLead.name.split(' ')[0] || '',
          lastName: foundLead.name.split(' ').slice(1).join(' ') || '',
          name: foundLead.name,
          email: foundLead.email,
          phone: foundLead.phone,
          companyName: foundLead.companyName || '',
          leadSource: foundLead.source || '',
          destination: foundLead.destination || '',
          startDate: new Date(foundLead.startDate),
          endDate: new Date(foundLead.endDate),
          travelers: foundLead.travelers,
          budget: foundLead.budget,
          travelType: foundLead.bookingType || '',
          requirements: {
            flight: foundLead.requirements?.flight || false,
            hotel: foundLead.requirements?.hotel || false,
            car: foundLead.requirements?.car || false,
            other: foundLead.requirements?.other || false,
          },
          paxDetails: foundLead.paxDetails || [
            {
              firstName: '',
              lastName: '',
              dateOfBirth: new Date(),
              passportNumber: '',
              documents: [],
            },
          ],
          notes: foundLead.notes || '',
        };
        
        setLead(formValues);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLead();
  }, [params.id]);

  const handleSubmit = async (data: LeadFormValues) => {
    try {
      setIsSubmitting(true);
      console.log('Form submitted:', data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      toast.success('Lead updated successfully');

      // Redirect to leads list
      router.push('/admin-dashboard/crm/leads');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to update lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size={32} text="Loading lead..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <ErrorDisplay
          error={error}
          onRetry={() => router.refresh()}
          className="mx-auto max-w-2xl"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Lead"
        description="Update lead information"
      />

      {lead && (
        <LeadForm
          onSubmit={handleSubmit}
          defaultValues={lead}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default EditLeadPage;