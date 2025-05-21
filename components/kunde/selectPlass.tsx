import React, { useEffect, useState } from "react";
import { useKundeStore } from "./kunde-store";
import { getPath, PlassRequest, PlassResponse } from "@/lib/data";
import { Button } from "../Button";

export function SelectPlass() {
  const [options, setOptions] = useState<PlassResponse[]>([]);
  const { setPlasser, visningnr } = useKundeStore();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([""]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${getPath("/api/kunde/plass")}/${visningnr}`);
        const data: PlassResponse[] = await res.json();
        setOptions(data);
        setSelectedSeats([""]);
      } catch (err) {
        console.error("Failed to fetch seat data:", err);
      }
    }
    fetchData();
  }, [visningnr]);

  function handleSelectChange(index: number, value: string) {
    const newSelected = [...selectedSeats];
    newSelected[index] = value;
    setSelectedSeats(newSelected);

    const seatsToSave: PlassRequest[] = [];

    newSelected.forEach((sel) => {
      if (!sel) return;
      const [radnrStr, setenrStr] = sel.split("-");
      seatsToSave.push({
        radnr: Number(radnrStr),
        setenr: Number(setenrStr),
      });
    });

    setPlasser(seatsToSave);
  }

  function addSelect() {
    setSelectedSeats([...selectedSeats, ""]);
  }

  function removeSelect(index: number) {
    const newSelected = selectedSeats.filter((_, i) => i !== index);
    setSelectedSeats(newSelected);

    const seatsToSave: PlassRequest[] = [];

    newSelected.forEach((sel) => {
      if (!sel) return;
      const [radnrStr, setenrStr] = sel.split("-");
      seatsToSave.push({
        radnr: Number(radnrStr),
        setenr: Number(setenrStr),
      });
    });

    setPlasser(seatsToSave);
  }

  return (
    <div>
      <h3>Velg seter:</h3>
      {selectedSeats.map((seatValue, index) => {
        // Seats selected in other selects (exclude current index)
        const selectedInOthers = selectedSeats.filter((_, i) => i !== index);

        // Filter options to exclude seats already selected in others
        const filteredOptions = options.filter(
          (option) =>
            !selectedInOthers.includes(`${option.radnr}-${option.setenr}`),
        );

        return (
          <div key={index} className="flex items-center mb-2">
            <select
              value={seatValue}
              onChange={(e) => handleSelectChange(index, e.target.value)}
              className="border p-1"
            >
              <option value="" disabled>
                Velg sete
              </option>
              {filteredOptions.map((option) => (
                <option
                  key={`${option.radnr}-${option.setenr}`}
                  value={`${option.radnr}-${option.setenr}`}
                >
                  {`Rad ${option.radnr}, Sete ${option.setenr}`}
                </option>
              ))}
            </select>

            <button
              onClick={() => removeSelect(index)}
              disabled={selectedSeats.length === 1}
              className="ml-2 text-red-600 hover:text-red-900"
              title="Fjern setevalg"
            >
              Fjern
            </button>

            {index === selectedSeats.length - 1 && (
              <Button className="ml-2" size="sm" onClick={addSelect}>
                Legg til nytt sete
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SelectPlass;
