import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export const WithAuth = (WrappedComponent) => {
  return (props) => {
    const { isUserPresent } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isUserPresent) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [isUserPresent, router]);

    return isUserPresent ? <WrappedComponent {...props} /> : null;
  };
};

export const WithoutAuth = (WrappedComponent) => {
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
