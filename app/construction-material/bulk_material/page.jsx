"use client";

import React from 'react'
import CategoryLayout from '../CategoryLayout'
import { bulkMaterialData } from '@/data/bulk_material/bulk_material'

function page() {
  return (
    <div>
        <CategoryLayout
            imagePath = "/construction-material-pages/category_banner_Bulk Material.png"
            brandImages={bulkMaterialData?.brandImages}
            categories={bulkMaterialData?.categories}
            brands={bulkMaterialData?.brands}
            products={bulkMaterialData?.products}
        />
    </div>
  )
}

export default page
