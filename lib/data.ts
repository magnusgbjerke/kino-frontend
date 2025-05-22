import { components } from "@/lib/schema";

export function getPath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}
//types
export type FilmRequest = components["schemas"]["FilmRequest"];
export type FilmResponse = components["schemas"]["FilmResponse"];
export type LocalTime = components["schemas"]["LocalTime"];
export type RegistrereBillett = components["schemas"]["RegistrereBillett"];
export type Billett = components["schemas"]["Billett"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type PlassRequest = components["schemas"]["PlassRequest"];
export type PlassResponse = components["schemas"]["PlassResponse"];
export type VisningRequest = components["schemas"]["VisningRequest"];
export type VisningResponse = components["schemas"]["VisningResponse"];
export type Statistikk = components["schemas"]["Statistikk"];
