"use client";

import { useSession } from "next-auth/react";
export function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-evenly container mx-auto">
      <div>dd</div>
      <div>
        <h1>AdminDashboard</h1> <br />
        <p>Signed in as {session?.user?.name}</p>
        <button
          onClick={async () => {
            window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=http://localhost:3000/auth/signout`;
          }}
          className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
