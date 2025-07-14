import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AtSign, Facebook, Mail, MapPinned, PhoneIncoming } from "lucide-react";
import { FC } from "react";
import Heading from "./heading";
import Links from "./links";
import Copyright from "./copyright";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/icons/social";
import SocialLink from "./social-link";

interface FooterProps {
  // Add your props here
  children?: React.ReactNode;
}

const destinations = [
  "Georgia",
  "Azerbaijan",
  "Kyrgzstan",
  "Armenia",
  "Turkey",
  "Thailand",
  "Singapore",
];

const quicklinks = [
  "Our Services",
  "Travel Inspiration & Tips",
  "Destinations",
  "UAE Activities",
];

const company = [
  "About Us",
  "Terms & Conditions",
  "Privacy Policy",
  "FAQs",
  "Contact Us",
];

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <footer className=" bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-8 flex flex-row justify-between py-10">
        <div>
          <Heading>Featured Destinations</Heading>
          <div className="mt-3 flex flex-col gap-1 text-xs">
            {destinations.map((destination, index) => (
              <Links key={index}>{destination}</Links>
            ))}
          </div>
        </div>
        <div>
          <Heading>Popular UAE Activities</Heading>
        </div>
        <div>
          <Heading>Quick Links</Heading>
          <div className="mt-3 flex flex-col gap-1 ">
            {quicklinks.map((quicklink, index) => (
              <Links key={index}>{quicklink}</Links>
            ))}
          </div>
        </div>
        <div>
          <Heading>Company</Heading>
          <div className="mt-3 flex flex-col gap-1 ">
            {company.map((company, index) => (
              <Links key={index}>{company}</Links>
            ))}
          </div>
        </div>
      </div>
      <div className="container max-w-7xl mx-auto px-8 ">
        <Separator />
        <div className="flex flex-row items-center justify-between py-4 gap-2">
          <Copyright />
          <div className="flex items-center justify-center gap-2 mt-1">
            <SocialLink>
              <FacebookIcon className="h-4 w-4 hover:fill-accent cursor-pointer" />
            </SocialLink>
            <SocialLink>
              <InstagramIcon className="h-4 w-4 hover:fill-accent cursor-pointer" />
            </SocialLink>
            <SocialLink>
              <XIcon className="h-4 w-4 hover:fill-accent cursor-pointer" />
            </SocialLink>
            <SocialLink>
              <LinkedinIcon className="h-4 w-4 hover:fill-accent cursor-pointer" />
            </SocialLink>
            <SocialLink>
              <YoutubeIcon className="h-4 w-4 hover:fill-accent cursor-pointer" />
            </SocialLink>
          </div>
        </div>
        <Separator />
      </div>
    </footer>
  );
};

export default Footer;
