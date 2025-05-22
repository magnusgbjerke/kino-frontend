"use client";

import { useEffect, useState } from "react";
import { ErrorResponse, getPath, VisningResponse } from "@/lib/data";
import { useSession } from "next-auth/react";

export function TilgjengeligeVisninger() {
  const [visninger, setVisninger] = useState<VisningResponse[] | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function getVisninger() {
      try {
        const response = await fetch(getPath("/api/kunde/visning"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data: VisningResponse[] = await response.json();
          setVisninger(data);
        } else {
          const errorData: ErrorResponse = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error("Failed to fetch visninger:", error);
      }
    }

    getVisninger();
  }, [session]);

  if (visninger === null) {
    return <div>Loading...</div>;
  }

  if (visninger.length === 0) {
    return <div>Ingen tilgjengelige visninger.</div>;
  }

  // Helper to format YYYY-MM-DD → DD.MM.YYYY
  function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Tilgjengelige visninger</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Visningnr</th>
              <th className="p-2 border">Filmnavn</th>
              <th className="p-2 border">Kinonavn</th>
              <th className="p-2 border">Kinosalnavn</th>
              <th className="p-2 border">Dato</th>
              <th className="p-2 border">Starttid</th>
              <th className="p-2 border">Pris</th>
            </tr>
          </thead>
          <tbody>
            {visninger.map((visning) => (
              <tr key={visning.visningnr} className="text-center">
                <td className="p-2 border">{visning.visningnr}</td>
                <td className="p-2 border">{visning.film?.filmnavn}</td>
                <td className="p-2 border">{visning.kinosal?.kinonavn}</td>
                <td className="p-2 border">{visning.kinosal?.kinosalnavn}</td>
                <td className="p-2 border">{formatDate(visning.dato)}</td>
                <td className="p-2 border">{visning.starttid}</td>
                <td className="p-2 border">{visning.pris} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
