"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { components } from "@/lib/schema";
import { getPath } from "@/lib/dataAdmin";

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

  const sendToAPI = async () => {
    if (!input) {
      console.warn("Input is empty. Aborting API call.");
      return;
    }

    const user: Film = {
      filmnavn: input,
    };

    try {
      console.log("Sending to API:", user);

      const response = await fetch(getPath("/api/administrasjon/film"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to send to API:", error?.message || error);
    }
  };

  return (
    <div>
      <h1>Registrer film</h1>
      <Input
        size="md"
        value={input}
        onChange={handleInputChange}
        className="ml-1 mr-1"
        placeholder="Enter phonenumber"
      />
      <Button size="sm" onClick={sendToAPI}>
        Send to API
      </Button>
    </div>
  );
}
