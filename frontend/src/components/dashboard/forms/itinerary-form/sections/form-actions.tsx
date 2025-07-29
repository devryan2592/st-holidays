import { FC } from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
}

const FormActions: FC<FormActionsProps> = ({ isSubmitting }) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button type="button" variant="outline" disabled={isSubmitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Itinerary"}
      </Button>
    </div>
  );
};

export default FormActions;