"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getRolesFromToken } from "@/lib/getRoleFromToken";
import { useGlobalStore } from "@/stores/global-store";
import { Kunde } from "@/components/kunde/kunde";
import { KinobetjentDashboard } from "@/components/kinobetjent/kinobetjentDashboard";
import { AdminDashboard } from "@/components/admin/adminDashboard";

export default function Home() {
  const { data: session, status } = useSession();
  const { role, setRole } = useGlobalStore();

  useEffect(() => {
    if (session?.accessToken) {
      const roles = getRolesFromToken(session.accessToken);

      if (roles?.includes("ADMIN")) {
        setRole("ADMIN");
      } else if (roles?.includes("KINOBETJENT")) {
        setRole("KINOBETJENT");
      } else if (roles?.includes("USER")) {
        setRole("USER");
      }
    }
  }, [session?.accessToken, setRole]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {!session ? (
        <Kunde />
      ) : (
        <div>
          {role === "ADMIN" && <AdminDashboard />}
          {role === "KINOBETJENT" && <KinobetjentDashboard />}
          {role === "USER" && <Kunde />}
        </div>
      )}
    </div>
  );
}
