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
export type Billett = components["schemas"]["Billett"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];

export function BestilleBillett() {
  const [visningnr, setVisningnr] = useState(0);
  const [registrerePlasser, setRegistrerePlasser] = useState<
    { radnr: number; setenr: number }[]
  >([{ radnr: 0, setenr: 0 }]);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const { data: session } = useSession();

  const handlePlassChange = (
    index: number,
    field: "radnr" | "setenr",
    value: number,
  ) => {
    const newPlasser = [...registrerePlasser];
    newPlasser[index][field] = value;
    setRegistrerePlasser(newPlasser);
  };

  const addPlassRow = () => {
    setRegistrerePlasser([...registrerePlasser, { radnr: 0, setenr: 0 }]);
  };

  const removePlassRow = (index: number) => {
    if (registrerePlasser.length === 1) return;
    const newPlasser = registrerePlasser.filter((_, i) => i !== index);
    setRegistrerePlasser(newPlasser);
  };

  const sendToAPI = async () => {
    if (!session?.accessToken) {
      console.error("No access token. User might not be logged in.");
      return;
    }

    const payload: RegistrereBillett = {
      visningnr: visningnr,
      registrerePlasser: registrerePlasser.map(({ radnr, setenr }) => ({
        radnr: radnr,
        setenr: setenr,
      })),
    };

    try {
      const response = await fetch(getPath("/api/kinobetjent/billett"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data: Billett = await response.json();
        setApiResponse(data.billettkode ?? null);
        alert("Billett registrert");
      } else {
        const errorData: ErrorResponse = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Failed to send to API:", error?.message || error);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      <h1 className="text-4xl font-bold mb-6">Bestill Billett</h1>

      <div>
        <label className="block mb-1 font-medium">Visningnummer</label>
        <Input
          value={String(visningnr)}
          onChange={(e) => setVisningnr(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Registrere Plasser</label>
        {registrerePlasser.map((plass, index) => (
          <div key={index} className="flex items-center space-x-4 mb-3">
            <div className="flex-1">
              <label className="block text-sm mb-1">Radnummer</label>
              <Input
                value={String(plass.radnr)}
                onChange={(e) =>
                  handlePlassChange(index, "radnr", Number(e.target.value))
                }
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Setenummer</label>
              <Input
                value={String(plass.setenr)}
                onChange={(e) =>
                  handlePlassChange(index, "setenr", Number(e.target.value))
                }
              />
            </div>

            <div>
              <Button
                size="sm"
                onClick={() => removePlassRow(index)}
                disabled={registrerePlasser.length === 1}
              >
                Fjern
              </Button>
            </div>
          </div>
        ))}
        <Button size="sm" onClick={addPlassRow}>
          Legg til plass
        </Button>
      </div>

      <div className="pt-4">
        <Button size="sm" onClick={sendToAPI}>
          Registrer plasser
        </Button>
      </div>

      <p>Generert billett: {apiResponse}</p>
    </div>
  );
}
