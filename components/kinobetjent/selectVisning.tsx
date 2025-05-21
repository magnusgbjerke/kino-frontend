import { components } from "@/lib/schema";
import React, { useEffect, useState } from "react";
import { useKinobetjentStore } from "./kinobetjent-store";
import { getPath } from "@/lib/dataAdmin";

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

export function SelectVisning() {
  const [options, setOptions] = useState<VisningResponse[]>([]);
  const { visningnr, setVisningnr, setApiResponse } = useKinobetjentStore();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`
            ${getPath("/api/kinobetjent/visning")}`);
        const data = await res.json();
        setOptions(data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }

    fetchData();
  }, []);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const visningnr = e.target.value;
    setVisningnr(visningnr);
    setApiResponse(null);
  }

  return (
    <select value={visningnr} onChange={handleChange} className="border">
      <option value="" disabled>
        Velg en visning
      </option>
      {options.map((option) => (
        <option key={option.visningnr} value={option.visningnr}>
          {`${option.film?.filmnavn} @ ${option.kinosal?.kinonavn} ${option.kinosal?.kinosalnavn} – ${formatDate(option.dato)} ${option.starttid.slice(0, 5)} (${option.pris} kr)`}
        </option>
      ))}
    </select>
  );
}

// Helper to format YYYY-MM-DD → DD.MM.YYYY
function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
}

export default SelectVisning;
