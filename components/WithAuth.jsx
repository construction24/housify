"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Loader from "@/components/Loader"; 

const WithAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { isUserPresent } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      // Check authentication status and set loading to false
      if (isUserPresent !== null) {
        setLoading(false);
        if (!isUserPresent) {
          router.push("/login"); // Redirect to login if not authenticated
        }
      }
    }, [isUserPresent, router]);

    if (loading) {
      return <Loader />;
    }

    return isUserPresent ? <WrappedComponent {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default WithAuth;
