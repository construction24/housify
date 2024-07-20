"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

// Higher-order component to protect routes for unauthenticated users
const WithoutAuth = (WrappedComponent) => {
  const WithoutAuthComponent = (props) => {
    const { isUserPresent } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isUserPresent) {
        router.push("/"); // Redirect to home if authenticated
      }
    }, [isUserPresent, router]);

    return !isUserPresent ? <WrappedComponent {...props} /> : null;
  };

  // Set display name for debugging purposes
  WithoutAuthComponent.displayName = `WithoutAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithoutAuthComponent;
};

export default WithoutAuth;
