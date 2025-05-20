"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getRolesFromToken } from "@/lib/getRoleFromToken";
import { useGlobalStore } from "@/stores/global-store";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Kunde } from "@/components/kunde/kunde";
import { KinobetjentDashboard } from "@/components/kinobetjent/KinobetjentDashboard";

export default function Home() {
  const { data: session, status } = useSession();
  const { role, setRole } = useGlobalStore();

  useEffect(() => {
    if (session?.accessToken) {
      const roles = getRolesFromToken(session.accessToken);
      console.log("Extracted roles:", roles);

      if (roles?.includes("ADMIN")) {
        setRole("ADMIN");
      } else if (roles?.includes("KINOBETJENT")) {
        setRole("KINOBETJENT");
      }
    }
  }, [session?.accessToken]);

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
        </div>
      )}
    </div>
  );
}
