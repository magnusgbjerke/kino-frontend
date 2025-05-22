"use client";

import { getPath, Statistikk } from "@/lib/data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function StatistikkVisning() {
  const [data, setData] = useState<Statistikk>();
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchData() {
      if (!session?.accessToken) {
        console.error("No access token. User might not be logged in.");
        return;
      }
      try {
        const res = await fetch(getPath("/api/administrasjon/statistikk"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const data: Statistikk = await res.json();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch seat data:", err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Statistikk</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Antall solgte plass-billetter</th>
              <th className="p-2 border">Antall ubetalte plass-billetter</th>
              <th className="p-2 border">Antall slettede bestillinger</th>
              <th className="p-2 border">Antall tilgjengelige visninger</th>
              <th className="p-2 border">Total omsetning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="p-2 border">{data?.antallSolgtePlassBilletter}</td>
              <td className="p-2 border">
                {data?.antallUbetaltePlassBilletter}
              </td>
              <td className="p-2 border">{data?.antallSlettedeBestillinger}</td>
              <td className="p-2 border">
                {data?.antallTilgjengeligeVisninger}
              </td>
              <td className="p-2 border">kr {data?.totalOmsetning}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
