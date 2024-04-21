"use client";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import BreadcrumbContainer from "../../../components/Breadcrumb"
import BrandsCrousel from "../BrandsCrousel";
import BrandsFilterAndDisplay from "../BrandsFilterAndDisplay";

import Image from "next/image";


function page() {

    const pathName = usePathname();
    const imagePath = "/construction-material-pages/category_banner_cement.png";

  return (
    <div className="container w-[90%] h-[200vh]">
        <Navbar className= "mb-10"/>
        <BreadcrumbContainer pathName = {pathName}/>
        <div className = " mw-[1200px] w-[90%] m-auto mt-7 mb-7">
            <Image
            src= {imagePath}
            width=  {1200}
            height= {1200}
            alt="this is banner image"
            className= "w-[100%]"
            ></Image>
        </div>

        <div className="brand-container ">
            <BrandsCrousel className= "mt-3 mb-8"/>
        </div>

        <div className="brand-items-container">
            <BrandsFilterAndDisplay/>
        </div>
    </div>
  );
}

export default page;
