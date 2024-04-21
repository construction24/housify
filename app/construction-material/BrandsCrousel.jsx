"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

import Image from "next/image";

function BrandsCarousel({className = ""}) {
  // Sample array of brand images
  const brandImages = [
    "/construction-material-pages/brandImages/cement/Best_Quality.webp",
    "/construction-material-pages/brandImages/cement/Best_Cost.webp",
    "/construction-material-pages/brandImages/cement/Asian.webp",
    "/construction-material-pages/brandImages/cement/Best_Cost.webp",
    "/construction-material-pages/brandImages/cement/Asian.webp",
    "/construction-material-pages/brandImages/cement/Best_Cost.webp",
    "/construction-material-pages/brandImages/cement/Best_Cost.webp",
    // "brand3.jpg",
    // "brand4.jpg",
    // "brand5.jpg",
    // "brand6.jpg",
    // "brand7.jpg",
    // "brand8.jpg",
  ];

  // State for the carousel API
  const [carouselApi, setCarouselApi] = useState(null);

  // Function to automatically scroll to the next slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApi) {
        carouselApi.scrollNext();
      }
    }, 3000); // 3 seconds interval

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <div className= {`${className}`}>
      <h3 className="font-bold mb-5">Brands</h3>
      <div className="carousel-container">
        <Carousel 
          opts={{
            align: "start",
            loop: true
          }}
          setApi={setCarouselApi}
          className = "w-full"
        >
          <CarouselContent>
            {brandImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                {/* Adjust the className as needed to style the image */}
                <Image 
                src={image} 
                alt={`Brand ${index + 1}`} 
                width={150}
                height={150}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default BrandsCarousel;
