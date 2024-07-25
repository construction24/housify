"use client";

import React from 'react'
import CategoryLayout from '../CategoryLayout';

import {cementData} from "@/data/cement/cement.js"

export default function page() {
  
  return (
    <div>
        <CategoryLayout
            imagePath = "/construction-material-pages/category_banner_Cement.png" 
            brandImages = {cementData?.brandImages}   
            categories={cementData?.subCategories}
            brands={cementData?.brands}
            products= {cementData?.products}
        />
    </div>
  )
}

