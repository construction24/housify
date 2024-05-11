import React from 'react'
import CategoryLayout from '../CategoryLayout'

import { bricksAndBlocksData } from '@/data/bricks_and_blocks/bricks_and_blocks'

function page() {
  return (
    <div>
        <CategoryLayout
            imagePath = "/construction-material-pages/category_banner_Bricks-and-Blocks.webp"
            brandImages={bricksAndBlocksData?.brandImages}
            categories={bricksAndBlocksData?.categories}
            brands={bricksAndBlocksData?.brands}
            products={bricksAndBlocksData?.products}
        />
    </div>
  )
}

export default page
