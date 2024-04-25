"use client";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi"; // Importing the arrow icon
import Footer from "./Footer";

function HeroSection() {
  return (
    <div className="h-[90vh] overflow-hidden">
      <Navbar />

      <div className="flex flex-col lg:flex-row justify-around items-center h-[70vh] sm:h-[90vh] p-20 pt-0">
        <div className="flex flex-col gap-4 justify-center items-center text-center animate-slide-in-right">
          <h1 className="-mb-7">Find your place of dream</h1>
          <p>We are glad to have you around. Feel free to browse our website</p>

          <Link href="/contact" className="w-[40%] mt-5">
            <Button className="-ml-4">
              Contact Us <FiArrowRight className="inline-block ml-1" />
            </Button>
          </Link>
        </div>

        <div className="hidden xl:block">
          <img
            src="/hero-image.png"
            height={400}
            width={400}
            className="mt-14 rounded-t-full"
            alt="HeroSection Image"
          ></img>
        </div>
      </div>

      {/* <Footer/> */}
    </div>
  );
}

export default HeroSection;
