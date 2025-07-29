import { FC } from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel?: () => void;
}

const FormActions: FC<FormActionsProps> = ({ isSubmitting, onCancel }) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline" 
        disabled={isSubmitting}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Lead"}
      </Button>
    </div>
  );
};

export default FormActions;