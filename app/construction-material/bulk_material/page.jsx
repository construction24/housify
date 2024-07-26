"use client";

import React, {useState, useEffect} from 'react'
import CategoryLayout from '../CategoryLayout'
import api from '@/lib/axiosInstance';
import Loader from '@/components/Loader';

function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/category/bulk_material`);
      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) return <Loader/>;

  return (
    <div>
        <CategoryLayout
            imagePath = "/construction-material-pages/category_banner_Bulk Material.png"
            brandImages={data?.brandImages}
            categories={data?.categories}
            brands={data?.brands}
            products={data?.products}
        />
    </div>
  )
}

export default Page
