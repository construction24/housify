"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ActionButtons({saveProductInDatabase}) {
  const [isDisabled , setIsDisabled] = useState(true);

  const router = useRouter();
  
  function redirectToProducts(){
    router.replace("/admin/products");
  }

  useEffect(()=>{
    if (typeof saveProductInDatabase === 'function') setIsDisabled(false);
  },[saveProductInDatabase])
  return (
    <div className="flex items-center gap-2 md:ml-auto md:flex">
      <div onClick={redirectToProducts}>
        <Button variant="outline" size="sm">Discard</Button>
      </div>
      <div onClick={() => saveProductInDatabase()}>
        <Button size="sm" disabled = {isDisabled}>Save Product</Button>
      </div>
    </div>
  );
}
