"use client";

import { useSession } from "next-auth/react";
export function KinobetjentDashboard() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-evenly container mx-auto">
      <div>dd</div>
      <div>
        <h1>KinobetjentDashboard</h1> <br />
        <p>Logget inn som {session?.user?.email}</p>
        <button
          onClick={async () => {
            window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=http://localhost:3000/auth/signout`;
          }}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Logg ut
        </button>
      </div>
    </div>
  );
}
