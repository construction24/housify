"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

// Higher-order component to protect routes for authenticated users
const WithAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const { isUserPresent } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isUserPresent) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [isUserPresent, router]);

    return isUserPresent ? <WrappedComponent {...props} /> : null;
  };

  // Set display name for debugging purposes
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};

export default WithAuth;
