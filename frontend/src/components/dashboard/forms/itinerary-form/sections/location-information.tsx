import { FC } from "react";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ItineraryFormValues } from "../types";

interface LocationInformationProps {
  control: Control<ItineraryFormValues>;
  destinations?: { id: string; name: string }[];
  cities?: { id: string; name: string; destinationId: string }[];
  isSubmitting?: boolean;
}

const LocationInformation: FC<LocationInformationProps> = ({
  control,
  isSubmitting,
  destinations = [
    { id: "destination-1", name: "Paris" },
    { id: "destination-2", name: "Tokyo" },
    { id: "destination-3", name: "New York" },
    { id: "destination-4", name: "London" },
    { id: "destination-5", name: "Rome" },
  ],
  cities = [
    { id: "city-1", name: "Paris City", destinationId: "destination-1" },
    { id: "city-2", name: "Nice", destinationId: "destination-1" },
    { id: "city-3", name: "Tokyo City", destinationId: "destination-2" },
    { id: "city-4", name: "Kyoto", destinationId: "destination-2" },
    { id: "city-5", name: "Manhattan", destinationId: "destination-3" },
    { id: "city-6", name: "Brooklyn", destinationId: "destination-3" },
    { id: "city-7", name: "Central London", destinationId: "destination-4" },
    { id: "city-8", name: "Westminster", destinationId: "destination-4" },
    { id: "city-9", name: "Rome City", destinationId: "destination-5" },
    { id: "city-10", name: "Vatican City", destinationId: "destination-5" },
  ],
}) => {
  // Get the selected destination ID to filter cities
  const selectedDestinationId = control._formValues.destinationId;
  
  // Filter cities based on selected destination
  const filteredCities = cities.filter(
    (city) => city.destinationId === selectedDestinationId
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Location Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="destinationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset cityIds when destination changes
                  control._formValues.cityIds = [];
                }}
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
                The main destination for this itinerary.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cityIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cities</FormLabel>
              <Select
                onValueChange={(value) => {
                  // Add the city to the array if it's not already there
                  if (!field.value?.includes(value)) {
                    field.onChange([...(field.value || []), value]);
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cities" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredCities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The cities included in this itinerary.
              </FormDescription>
              <FormMessage />
              
              {/* Display selected cities */}
              {field.value && field.value.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Selected Cities:</p>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((cityId) => {
                      const city = cities.find((c) => c.id === cityId);
                      return (
                        <div 
                          key={cityId} 
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md flex items-center"
                        >
                          <span>{city?.name || cityId}</span>
                          <button
                            type="button"
                            className="ml-2 text-primary hover:text-primary/80"
                            onClick={() => {
                              field.onChange(
                                field.value?.filter((id) => id !== cityId) || []
                              );
                            }}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default LocationInformation;