"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { components } from "@/lib/schema";
import { getPath } from "@/lib/data";
import { useSession } from "next-auth/react";

export type FilmRequest = components["schemas"]["FilmRequest"];
export type FilmResponse = components["schemas"]["FilmResponse"];
export type LocalTime = components["schemas"]["LocalTime"];
export type RegistrereBillett = components["schemas"]["RegistrereBillett"];
export type Billett = components["schemas"]["Billett"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type PlassRequest = components["schemas"]["PlassRequest"];
export type PlassResponse = components["schemas"]["PlassResponse"];
export type VisningRequest = components["schemas"]["VisningRequest"];
export type VisningResponse = components["schemas"]["VisningResponse"];

export function RegistrereBetaling() {
  const [input, setInput] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const { data: session } = useSession();

  const sendToAPI = async () => {
    if (!input) {
      console.warn("Input is empty. Aborting API call.");
      return;
    }

    if (!session?.accessToken) {
      console.error("No access token. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch(
        `
    ${getPath("/api/kinobetjent/billett")}/${input}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (response.ok) {
        alert("Betaling av billett er registrert");
      } else {
        const errorData: ErrorResponse = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to send to API:", error?.message || error);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Registrer betaling</h1>

      <div>
        <label className="block mb-1 font-medium">Billettkode</label>
        <Input
          size="md"
          value={input}
          onChange={handleInputChange}
          className="ml-1 mr-1"
          placeholder=""
        />
      </div>

      <div className="pt-4">
        <Button size="sm" onClick={sendToAPI}>
          Registrer
        </Button>
      </div>
    </div>
  );
}
