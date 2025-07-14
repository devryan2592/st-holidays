"use client";

import { cn } from "@/lib/utils";
import React, { FC, useRef, useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface AutoPlayCarouselProps {
  // Add your props here
  children?: React.ReactNode;
  className?: string;
  itemsToShow?: "three" | "four";
  autoplayDelay?: number;
}

const AutoPlayCarousel: FC<AutoPlayCarouselProps> = ({
  children,
  className,
  itemsToShow = "three",
  autoplayDelay = 3000,
}) => {
  const plugin = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <Carousel>
      <CarouselContent>
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index} className={className}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AutoPlayCarousel;
