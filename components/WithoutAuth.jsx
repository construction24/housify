"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader"; 

const WithoutAuth = (WrappedComponent) => {
  const WithoutAuthComponent = (props) => {
    const { isUserPresent } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      // Check authentication status and set loading to false
      if (isUserPresent !== null) {
        setLoading(false);
        if (isUserPresent) {
          router.push("/"); // Redirect to home if authenticated
        }
      }
    }, [isUserPresent, router]);

    if (loading) {
      return <Loader />;
    }

    return !isUserPresent ? <WrappedComponent {...props} /> : null;
  };

  WithoutAuthComponent.displayName = `WithoutAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithoutAuthComponent;
};

export default WithoutAuth;
