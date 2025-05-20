import { components, paths } from "@/lib/schema";

export function getPath<PathKey extends keyof paths>(path: PathKey): string {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}
//types
export type Film = components["schemas"]["Film"];
export type LocalTime = components["schemas"]["LocalTime"];
export type RegistrereBillett = components["schemas"]["RegistrereBillett"];
export type RegistrerePlasser = components["schemas"]["RegistrerePlasser"];
export type Visning = components["schemas"]["Visning"];

//Fetches
export async function getFilm(): Promise<Film[]> {
  const response = await fetch(getPath("/api/administrasjon/film"));
  const film: Film[] = await response.json();
  return film;
}

export async function oppdatereVisning(): Promise<Visning> {
  const response = await fetch(
    `
    ${getPath("/api/administrasjon/visning")}`,
    {
      method: "PUT",
    },
  );
  const voucher = await response.json();
  return voucher;
}

export async function postVisning(): Promise<Film[]> {
  const response = await fetch(getPath("/api/administrasjon/visning"));
  const visning = await response.json();
  return visning;
}

export async function deleteVisning(visningsnr: number) {
  const response = await fetch(
    `
    ${getPath(`/api/administrasjon/visning`)}/${visningsnr}`,
    {
      method: "DELETE",
    },
  );
  const voucher = await response.json();
  return voucher;
}
