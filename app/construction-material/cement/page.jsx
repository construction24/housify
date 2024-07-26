"use client";

import React, {useEffect , useState} from 'react'
import CategoryLayout from '../CategoryLayout';
import api from '@/lib/axiosInstance';
import Loader from '@/components/Loader';

function Page() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/category/cement`);
      setData(res.data);
    };

    fetchData();
  }, []);

  if (!data) return <Loader/>;
  
  return (
    <div>
        <CategoryLayout
            imagePath = "/construction-material-pages/category_banner_Cement.png" 
            brandImages = {data?.brandImages}   
            categories={data?.categories}
            brands={data?.brands}
            products= {data?.products}
        />
    </div>
  )
}

export default Page;

