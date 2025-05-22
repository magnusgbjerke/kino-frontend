"use client";

import { useGlobalStore } from "@/stores/global-store";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { setRole } = useGlobalStore();
  useEffect(() => {
    setRole("");
    const activateSession = async () => {
      await signOut({ redirect: false });
    };
    activateSession();
    router.push("/");
  }, [router]);

  return <div>Redirecting...</div>;
};

export default Page;
