import { FC, useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ItineraryFormValues } from "../types";

interface AdditionalInformationProps {
  control: Control<ItineraryFormValues>;
  isSubmitting?: boolean;
}

const AdditionalInformation: FC<AdditionalInformationProps> = ({
  control,
  isSubmitting,
}) => {
  // State for new items
  const [newHighlight, setNewHighlight] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newTerm, setNewTerm] = useState("");

  // Field arrays for dynamic lists
  const {
    fields: highlightsFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  const {
    fields: inclusionsFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: "inclusions",
  });

  const {
    fields: exclusionsFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: "exclusions",
  });

  const {
    fields: termsFields,
    append: appendTerm,
    remove: removeTerm,
  } = useFieldArray({
    control,
    name: "terms",
  });

  // Add new item handlers
  const addHighlight = () => {
    if (newHighlight.trim()) {
      appendHighlight({
        text: newHighlight.trim(),
      });
      setNewHighlight("");
    }
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      appendInclusion({
        text: newInclusion.trim(),
      });
      setNewInclusion("");
    }
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      appendExclusion({
        text: newExclusion.trim(),
      });
      setNewExclusion("");
    }
  };

  const addTerm = () => {
    if (newTerm.trim()) {
      appendTerm({
        text: newTerm.trim(),
      });
      setNewTerm("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Highlights */}
        <div className="space-y-2">
          <FormLabel>Highlights</FormLabel>
          <div className="flex space-x-2">
            <Input
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a highlight"
              className="flex-1"
            />
            <Button type="button" onClick={addHighlight} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {highlightsFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="bg-muted p-2 rounded-md flex-1">
                  {field.text}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHighlight(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions */}
        <div className="space-y-2">
          <FormLabel>Inclusions</FormLabel>
          <div className="flex space-x-2">
            <Input
              value={newInclusion}
              onChange={(e) => setNewInclusion(e.target.value)}
              placeholder="Add an inclusion"
              className="flex-1"
            />
            <Button type="button" onClick={addInclusion} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {inclusionsFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="bg-muted p-2 rounded-md flex-1">
                  {field.text}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeInclusion(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="space-y-2">
          <FormLabel>Exclusions</FormLabel>
          <div className="flex space-x-2">
            <Input
              value={newExclusion}
              onChange={(e) => setNewExclusion(e.target.value)}
              placeholder="Add an exclusion"
              className="flex-1"
            />
            <Button type="button" onClick={addExclusion} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {exclusionsFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="bg-muted p-2 rounded-md flex-1">
                  {field.text}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExclusion(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="space-y-2">
          <FormLabel>Terms & Conditions</FormLabel>
          <div className="flex space-x-2">
            <Input
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              placeholder="Add a term"
              className="flex-1"
            />
            <Button type="button" onClick={addTerm} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {termsFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <div className="bg-muted p-2 rounded-md flex-1">
                  {field.text}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTerm(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformation;
