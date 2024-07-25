"use client";

import React from 'react'
import CategoryLayout from '../CategoryLayout'

import { bricksAndTilesData } from '@/data/bricks_and_tiles/bricks_and_tiles'

function page() {
  return (
    <div>
        <CategoryLayout
            imagePath = "/construction-material-pages/category_banner_Bricks-and-Blocks.webp"
            brandImages={bricksAndTilesData?.brandImages}
            categories={bricksAndTilesData?.subCategories}
            brands={bricksAndTilesData?.brands}
            products={bricksAndTilesData?.products}
        />
    </div>
  )
}

export default page
