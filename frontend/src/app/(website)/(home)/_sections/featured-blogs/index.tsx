import { FC } from "react";
import BlogCard from "./blog-card";
import AutoPlayCarousel from "@/components/custom-ui/autoplay-carousel";

interface FeaturedBlogsProps {
  // Add your props here
  children?: React.ReactNode;
}

const FeaturedBlogs: FC<FeaturedBlogsProps> = ({ children }) => {
  return (
    <section className="container py-20 px-8 mx-auto max-w-7xl">
      <div className="flex flex-col ">
        <p className="mb-1 text-accent text-sm uppercase font-bold font-barlow leading-7 tracking-widest">
          Blogs
        </p>
        <h2 className="text-4xl font-bold font-poppins leading-12 uppercase ">
          Travel Inspiration & Tips
        </h2>
        <p className=" text-muted-foreground">
          Unlock expert advice, captivating stories, and fresh travel ideas in
          our latest blog posts.
        </p>
      </div>

      <div className="mt-10">
        <AutoPlayCarousel className="lg:basis-1/2">
          <BlogCard />
          <BlogCard />
        </AutoPlayCarousel>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
