import { NextPage } from "next";
import HeroSection from "./_sections/hero-section";
import AboutUs from "./_sections/about-us";
import FeaturedDestinations from "./_sections/featured-destinations";
import PopularTours from "./_sections/popular-tours";

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
    </>
  );
};

export default Home;
