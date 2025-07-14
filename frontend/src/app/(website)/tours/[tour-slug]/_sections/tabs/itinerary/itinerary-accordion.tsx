import { FC } from "react";
import {
  BellIcon,
  ChevronDownIcon,
  ForkKnifeCrossed,
  LifeBuoyIcon,
  Link2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "Connected accounts",
    content:
      "Connect your accounts from Google, GitHub, or Microsoft to enable single sign-on and streamline your workflow. Connected accounts can be used for quick login and importing your preferences across platforms. You can revoke access to any connected account at any time.",
    meals: ["Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "2",
    title: "Notifications",
    content:
      "Choose which updates you want to receive. You can get notifications for: security alerts, billing updates, newsletter and product announcements, usage reports, and scheduled maintenance. Notifications can be delivered via email, SMS, or push notifications on your devices.",
    meals: ["Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "3",
    title: "2-step verification",
    content:
      "Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
    meals: ["Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "4",
    title: "Contact support",
    content:
      "Our support team is available around the ClockIcon to assist you. For billing inquiries, technical issues, or general questions, you can reach us through live chat, email at support@example.com, or schedule a call with our technical team. Premium support is available for enterprise customers.",
    meals: ["Breakfast", "Lunch", "Dinner"],
  },
];

interface ItineraryAccordionProps {
  // Add your props here
  children?: React.ReactNode;
}

const ItineraryAccordion: FC<ItineraryAccordionProps> = ({ children }) => {
  return (
    <div className="space-y-4">
      <Accordion
        type="single"
        collapsible
        className="w-full bg-background"
        defaultValue={items[0].id}
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="p-2 border my-1"
          >
            <AccordionHeader className="flex">
              <AccordionTrigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180">
                <span className="flex items-center gap-3 ">
                  <span
                    className="flex flex-col size-14 shrink-0 items-center justify-center rounded-full border bg-primary text-primary-foreground"
                    aria-hidden="true"
                  >
                    <span className="text-xs leading-4">Day</span>
                    <span className="font-poppins text-base font-semibold">
                      0{item.id}
                    </span>
                  </span>
                  <span className="flex flex-col space-y-[0.5px]">
                    <span className="text-base font-bold text-primary">
                      {item.title}
                    </span>
                  </span>
                </span>
                <ChevronDownIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent className="text-muted-foreground ms-3 ps-14 pb-2 text-base ">
              <div>
                <p>{item.content}</p>
                <div className="flex mt-4 items-center gap-4">
                  {item.meals.map((meal) => (
                    <div
                      key={meal}
                      className="flex items-center gap-1 bg-secondary px-2 py-1"
                    >
                      <ForkKnifeCrossed className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium leading-6 text-muted-foreground">
                        {meal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ItineraryAccordion;
