"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const WithoutAuth = (WrappedComponent) => {
    return (props) => {
      const { isUserPresent } = useAuth();
      const router = useRouter();
  
      useEffect(() => {
        if (isUserPresent) {
          router.push("/"); // Redirect to home if authenticated
        }
      }, [isUserPresent, router]);
  
      return !isUserPresent ? <WrappedComponent {...props} /> : null;
    };
  };

export default WithoutAuth;
  