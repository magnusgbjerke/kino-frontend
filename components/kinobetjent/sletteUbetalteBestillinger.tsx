"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { ErrorResponse, getPath } from "@/lib/data";
import { useSession } from "next-auth/react";

export function SletteUbetalteBestillinger() {
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
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (response.ok) {
        alert(`Ubetalte billetter til visning ${input} er slettet`);
        setInput("");
      } else {
        const errorData: ErrorResponse = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to send to API:", error);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">
        Slette Ubetalte Billetter til en visning
      </h1>

      <div>
        <label className="block mb-1 font-medium">Visningsnummer</label>
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
          Slett
        </Button>
      </div>
    </div>
  );
}
