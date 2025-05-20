"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { components } from "@/lib/schema";
import { getPath } from "@/lib/dataAdmin";
import { useSession } from "next-auth/react";

export type Film = components["schemas"]["Film"];
export type LocalTime = components["schemas"]["LocalTime"];
export type RegistrereBillett = components["schemas"]["RegistrereBillett"];
export type RegistrerePlasser = components["schemas"]["RegistrerePlasser"];
export type Visning = components["schemas"]["Visning"];

export function RegistrereFilm() {
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

    const user: Film = { filmnavn: input };

    try {
      const response = await fetch(getPath("/api/administrasjon/film"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Film lagt til");
      } else {
        const text = await response.text();
        console.error("API error:", text);
      }
    } catch (error) {
      console.error("Failed to send to API:", error?.message || error);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Registrer film</h1>
      <Input
        size="md"
        value={input}
        onChange={handleInputChange}
        className="ml-1 mr-1"
        placeholder=""
      />
      <div className="pt-4">
        <Button size="sm" onClick={sendToAPI}>
          Registrer
        </Button>
      </div>
    </div>
  );
}
