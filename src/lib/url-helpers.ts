import { Person } from "@/types/apiData";

// we want to extract '/people/1/' from the ful swapi URL: https://swapi.dev/api/people/1/
export const extractPath = (url: string): string => {
  const parts = url.split("/api");
  return parts.length > 1 ? parts[1] : ""; // Return an empty string if "/api" is not found
};

// get the correct link depending on the column type
export const getLink = (columnKey: keyof Person, person: Person): string => {
  if (columnKey === "name") return extractPath(person.url);
  const value = person[columnKey];
  return typeof value === "string" ? extractPath(value) : "#"; // Fallback to "#" for arrays or invalid values
};
