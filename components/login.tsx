"use client";

import { signIn } from "next-auth/react";

export function Login() {
  return (
    <>
      {" "}
      <h1> Login for Kinoens ansatte</h1>
      <button
        onClick={() => signIn("keycloak")}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </>
  );
}
