"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetProfileQuery } from "./redux/Api/userApi";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const { data: myProfile, isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });
const id = pathname.split("/").pop();
  useEffect(() => {
 

    if (!isLoading && myProfile) {
      const role = myProfile?.data?.user?.role;

      // current shift id
      

      if (role !== "bartender") {
        router.push(`/auth/login/${id}`);
      }
    }
  }, [token, myProfile, isLoading, pathname, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // role check
  if (myProfile?.data?.user?.role !== "bartender") {
    return null;
  }

  return children;
};

export default ProtectedRoute;