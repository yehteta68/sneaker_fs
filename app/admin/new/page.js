"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminAddSneakerForm from "@/components/AdminAddSneakerForm";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/admin/login");
    }
  }, [router]);
  return <AdminAddSneakerForm />;
}