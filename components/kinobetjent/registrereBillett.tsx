"use client";

import { useState } from "react";
import { Button } from "../Button";
import { components } from "@/lib/schema";
import { getPath } from "@/lib/dataAdmin";
import SelectVisning from "./selectVisning";
import SelectPlass from "./selectPlass";
import { useKinobetjentStore } from "./kinobetjent-store";
import { useSession } from "next-auth/react";

export type FilmRequest = components["schemas"]["FilmRequest"];
export type FilmResponse = components["schemas"]["FilmResponse"];
export type LocalTime = components["schemas"]["LocalTime"];
export type RegistrereBillett = components["schemas"]["RegistrereBillett"];
export type PlassRequest = components["schemas"]["PlassRequest"];
export type PlassResponse = components["schemas"]["PlassResponse"];
export type VisningRequest = components["schemas"]["VisningRequest"];
export type VisningResponse = components["schemas"]["VisningResponse"];
export type Billett = components["schemas"]["Billett"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];

export function RegistrereBillett() {
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const { visningnr, plasser, setPlasser, setVisningnr } =
    useKinobetjentStore();
  const { data: session } = useSession();
  const sendToAPI = async () => {
    if (!session?.accessToken) {
      console.error("No access token. User might not be logged in.");
      return;
    }

    const payload: RegistrereBillett = {
      visningnr: Number(visningnr),
      registrerePlasser: plasser,
    };

    try {
      console.log(JSON.stringify(payload));
      const response = await fetch(getPath("/api/kinobetjent/billett"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data: Billett = await response.json();

        alert("Billett registrert");
        setVisningnr("");
        setPlasser([]);
        setApiResponse(data.billettkode ?? null);
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
      <h1 className="text-4xl font-bold mb-6">Bestill Billett</h1>
      <SelectVisning />
      {visningnr && <SelectPlass />}
      {visningnr && (
        <div className="pt-4">
          <Button size="sm" onClick={sendToAPI}>
            Registrer plasser
          </Button>
        </div>
      )}
      {apiResponse && (
        <p className="font-bold pt-2">Generert billett: {apiResponse}</p>
      )}
    </div>
  );
}
