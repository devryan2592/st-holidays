import { NextPage } from "next";
import HeroSection from "./_sections/hero-section";
import AboutUs from "./_sections/about-us";
import FeaturedDestinations from "./_sections/featured-destinations";
import PopularTours from "./_sections/popular-tours";
import CTA from "./_sections/cta";
import FeaturedBlogs from "./_sections/featured-blogs";

interface HomeProps {
  // Add your page props here
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <FeaturedDestinations />
      <PopularTours />
      <CTA />
      <FeaturedBlogs />
    </>
  );
};

export default Home;
