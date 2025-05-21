"use client";

import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { ErrorResponse, getPath, VisningRequest } from "@/lib/data";
import { useSession } from "next-auth/react";

export function RegistrereVisning() {
  const [dato, setDato] = useState("2024-02-02");
  const [filmnr, setFilmnr] = useState(1);
  const [kinosalnr, setKinosalnr] = useState(201);
  const [pris, setPris] = useState(100);
  const [starttid, setStarttid] = useState("16:00:00");
  const [visningnr, setVisningnr] = useState(1);
  const { data: session } = useSession();

  const sendToAPI = async () => {
    if (!session?.accessToken) {
      console.error("No access token. User might not be logged in.");
      return;
    }

    const visning: VisningRequest = {
      dato,
      filmnr,
      kinosalnr,
      pris,
      starttid,
      visningnr,
    };

    try {
      const response = await fetch(getPath("/api/administrasjon/visning"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(visning),
      });

      if (response.ok) {
        alert(`Visning ${visningnr} er registrert`);
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
      <h1 className="text-4xl font-bold mb-6">Registrere visning</h1>

      <div>
        <label className="block mb-1 font-medium">Visningsnummer</label>
        <Input
          value={String(visningnr)}
          onChange={(e) => setVisningnr(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Filmnummer</label>
        <Input
          value={String(filmnr)}
          onChange={(e) => setFilmnr(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Kinosalnummer</label>
        <Input
          value={String(kinosalnr)}
          onChange={(e) => setKinosalnr(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Dato (YYYY-MM-DD)</label>
        <Input value={dato} onChange={(e) => setDato(e.target.value)} />
      </div>

      <div>
        <label className="block mb-1 font-medium">Starttid (HH:MM:SS)</label>
        <Input value={starttid} onChange={(e) => setStarttid(e.target.value)} />
      </div>

      <div>
        <label className="block mb-1 font-medium">Pris</label>
        <Input
          value={String(pris)}
          onChange={(e) => setPris(Number(e.target.value))}
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
