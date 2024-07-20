"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const { isUserPresent } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isUserPresent) {
        router.push("/login"); 
      }
    }, [isUserPresent, router]);

    return isUserPresent ? <WrappedComponent {...props} /> : null;
  };
};

export default WithAuth;
