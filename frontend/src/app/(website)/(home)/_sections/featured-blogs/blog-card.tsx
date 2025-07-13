import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Contact, User } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface BlogCardProps {
  // Add your props here
  children?: React.ReactNode;
}

const BlogCard: FC<BlogCardProps> = ({ children }) => {
  return (
    <div className="border p-4">
      <div className="flex md:flex-row flex-col gap-6">
        <div className="md:h-48 relative aspect-square shrink-0">
          <Image src="/placeholder.jpg" alt="" fill />
        </div>
        <div className="">
          <Badge className="bg-accent">Top 10</Badge>
          <div className="mt-2">
            <h2 className="text-xl font-bold line-clamp-2">
              Top 10 Places to visit in UAE and enjoy the best
            </h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
              UAE is a country with a rich history and culture, and it is no
              wonder that it has many great things to see and do. Whether you
              are here to relax and unwind, or you are here to explore the city,
              you will find something to do for everyone.
            </p>

            <div className="mt-4 flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-1.5">
                <User size={16} className="stroke-[1.5]" />
                <p className="text-sm text-muted-foreground">
                  By{" "}
                  <span className="font-semibold underline underline-offset-1 hover:text-primary cursor-pointer transition-all duration-100">
                    John Doe
                  </span>
                </p>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <CalendarClock size={16} className="stroke-[1.5]" />
                <p className="text-sm text-muted-foreground">
                  <time dateTime="2021-01-01">1 Jan 2021</time>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
