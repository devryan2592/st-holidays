import { FC } from "react";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ItineraryFormValues, MEAL_OPTIONS } from "../types";

interface DayItineraryItemsProps {
  control: Control<ItineraryFormValues>;
  isSubmitting: boolean;
}

const DayItineraryItems: FC<DayItineraryItemsProps> = ({ 
  control, 
  isSubmitting 
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dayItineraryItems",
  });

  const addDayItinerary = () => {
    const nextDayNumber = fields.length + 1;
    append({
      dayNumber: nextDayNumber,
      title: "",
      description: "",
      images: [],
      meals: [],
      duration: 1,
      order: nextDayNumber - 1,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Day Itinerary Items</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addDayItinerary}
          disabled={isSubmitting}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Day
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border rounded-lg p-4 space-y-4 relative"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Day {index + 1}</h4>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
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
                name={`dayItineraryItems.${index}.dayNumber`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        placeholder="Day number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`dayItineraryItems.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Day title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`dayItineraryItems.${index}.description`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the activities for this day" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`dayItineraryItems.${index}.duration`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (hours)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        placeholder="Duration in hours" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`dayItineraryItems.${index}.order`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0} 
                        placeholder="Display order" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Order in which this day appears (0 is first)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Meals section */}
            <div className="mt-4">
              <FormLabel className="block mb-2">Meals Included</FormLabel>
              <div className="flex flex-wrap gap-4">
                {MEAL_OPTIONS.map((meal) => (
                  <FormField
                    key={meal.value}
                    control={control}
                    name={`dayItineraryItems.${index}.meals`}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={meal.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(meal.value as any)}
                              onCheckedChange={(checked) => {
                                const currentValue = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValue, meal.value]);
                                } else {
                                  field.onChange(
                                    currentValue.filter((value) => value !== meal.value)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {meal.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Images section - simplified for now */}
            <FormField
              control={control}
              name={`dayItineraryItems.${index}.images`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Image URL" 
                      onChange={(e) => {
                        // Simple implementation - just add the URL to the array
                        // In a real app, you'd want to handle multiple image uploads
                        if (e.target.value) {
                          field.onChange([...field.value || [], e.target.value]);
                          e.target.value = "";
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter image URLs one at a time and press Enter
                  </FormDescription>
                  <FormMessage />
                  
                  {/* Display added images */}
                  {field.value && field.value.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">Added Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((url, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md flex items-center"
                          >
                            <span className="truncate max-w-[150px]">{url}</span>
                            <button
                              type="button"
                              className="ml-2 text-primary hover:text-primary/80"
                              onClick={() => {
                                const newImages = [...field.value || []];
                                newImages.splice(imgIndex, 1);
                                field.onChange(newImages);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DayItineraryItems;