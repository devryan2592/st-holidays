import { FC } from "react";
import { ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TourPolicyProps {
  children?: React.ReactNode;
}

const policies = [
  "The package is subject to availability at the time of booking.",
  "The displayed rates do not apply during Christmas, New Year, special events, peak season and blackout dates. Additional surcharges may apply.",
  "All Rooms & Offers are subject to availability at the time of confirmation",
  "Rates for single/triple/quad occupancy will vary and can be provided upon request. However, the rates and options for increasing the pax are subject to availability.",
  "Bookings will only be confirmed upon the receipt of the complete payment as per the booking terms.",
  "Rates mentioned are per person on a double sharing basis.",
  "The standard check-in time at the hotel is 1400/1500 hours while the check-out time is 1100/1200 hours. Early check-in and late check-out are subject to availability and will incur extra costs.",
  "Passengers are solely responsible for meeting the passport and visa requirements of the country they are planning the travel too.",
  "The passport must be valid for at least six months from the date of departure.",
  "Due to the several circumstances that remain out of our control and jurisdiction like adverse currency fluctuations, fuel surcharges, taxes, etc. The displayed price tag is subject to change without any prior notice.",
  "In accordance with the immigration rules of the destination, passengers are responsible for ensuring that they possess a valid passport both before and during the period of travel. The same applies to any visa requirements that the traveler must obtain before travelling to the country for which the package is being booked.",
  "Travelwings does not take any responsibility if the passenger is unable to travel due to issues related to their passport or visa. The cancellation policy will be applicable as per the booking terms and conditions.",
];

const cancellationPolicy = {
  worldTours: [
    { days: "More than 90 days", charges: "Registration Amount or 20% of tour cost whichever is higher" },
    { days: "90 - 61 days", charges: "30%" },
    { days: "60 - 46 days", charges: "50%" },
    { days: "45 - 31 days", charges: "75%" },
    { days: "30 - 16 days", charges: "90%" },
    { days: "15 - 01 days", charges: "100%" },
    { days: "On the day of departure", charges: "100%" },
    { days: "On Tour", charges: "100%" },
  ],
  indianTours: [
    { days: "More than 90 days", charges: "Registration Amount or 20% of tour cost whichever is higher" },
    { days: "90 - 61 days", charges: "30%" },
    { days: "60 - 46 days", charges: "50%" },
    { days: "45 - 31 days", charges: "75%" },
    { days: "30 - 16 days", charges: "90%" },
    { days: "15 - 01 days", charges: "100%" },
    { days: "On the day of departure", charges: "100%" },
    { days: "On Tour", charges: "100%" },
  ],
};

const TourPolicy: FC<TourPolicyProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {policies.map((policy) => (
        <div key={policy} className="flex gap-3 items-start">
          <ShieldCheck className="stroke-primary stroke-[1.5] shrink-0 mt-1" size={20} />
          <p className="text-muted-foreground">{policy}</p>
        </div>
      ))}
      <div className="flex gap-3 items-center">
        <ShieldCheck className="stroke-primary stroke-[1.5] shrink-0" size={20} />
        <Dialog>
          <DialogTrigger asChild>
            <p className="text-primary font-semibold cursor-pointer">Read the full cancellation policy</p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Your options if plans change</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Number of days before departure from the date of receipt of your cancellation request</th>
                    <th scope="col" className="px-6 py-3">World Tours</th>
                    <th scope="col" className="px-6 py-3">Indian Tours</th>
                  </tr>
                </thead>
                <tbody>
                  {cancellationPolicy.worldTours.map((tour, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{tour.days}</td>
                      <td className="px-6 py-4">{tour.charges}</td>
                      <td className="px-6 py-4">{cancellationPolicy.indianTours[index].charges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">Cancellation on Additional Service/Deviation will be charge extra GST is applicable on cancellation charges</p>
            <p className="text-center text-sm text-muted-foreground mt-4">Need a human touch? Our friendly Customer Support <span className="text-primary font-semibold">1800 266 1100</span> (Toll Free) is there for you.</p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TourPolicy;