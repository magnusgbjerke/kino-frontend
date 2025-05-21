import { components, paths } from "@/lib/schema";

export function getPath<PathKey extends keyof paths>(path: PathKey): string {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}
//types
export type FilmRequest = components["schemas"]["FilmRequest"];
export type FilmResponse = components["schemas"]["FilmResponse"];
export type LocalTime = components["schemas"]["LocalTime"];
export type RegistrereBillett = components["schemas"]["RegistrereBillett"];
export type RegistrerePlasser = components["schemas"]["Plass"];
export type Visning = components["schemas"]["Visning"];
export type Billett = components["schemas"]["Billett"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
