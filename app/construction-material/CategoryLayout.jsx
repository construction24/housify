"use client";

import { usePathname } from "next/navigation";
import BreadcrumbContainer from "../../components/Breadcrumb"
import BrandsCrousel from "./BrandsCrousel";
import BrandsFilterAndDisplay from "./BrandsFilterAndDisplay";

import Image from "next/image";


function CategoryLayout({imagePath}) {

    const pathName = usePathname();
    const category = pathName.split("/").pop();

  return (
    <div className="container">
        <BreadcrumbContainer pathName = {pathName}/>
        <div className = "m-auto mt-7 mb-7 ">
            <Image
            src= {imagePath}
            width=  {1200}
            height= {200}
            alt="this is banner image"
            className= "w-[100%]"
            priority = {true}
            ></Image>
        </div>

        <div className="brand-container mb-9 mt-10">
            <BrandsCrousel className= "mt-3 mb-8"/>
        </div>

        <div className="brand-items-container mt-14">
            <BrandsFilterAndDisplay category = {category}/>
        </div>
    </div>
  );
}

export default CategoryLayout;
