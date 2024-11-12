import { extractPath, getLink } from "./url-helpers";
import { Person } from "@/types/apiData";

// basic mock data
const mockPerson: Partial<Person> = {
  name: "Luke Skywalker",
  homeworld: "https://swapi.dev/api/planets/1/",
  films: ["https://swapi.dev/api/films/1/"],
  url: "https://swapi.dev/api/people/1/",
};

describe("extractPath", () => {
  test("returns the path part of a SWAPI URL", () => {
    const url = "https://swapi.dev/api/people/1/";
    expect(extractPath(url)).toBe("/people/1/");
  });

  test("returns an empty string if '/api' is not found in the URL", () => {
    const url = "https://swapi.dev/people/1/";
    expect(extractPath(url)).toBe("");
  });

  test("handles a URL with '/api' at the end", () => {
    const url = "https://swapi.dev/api/";
    expect(extractPath(url)).toBe("/");
  });
});

describe("getLink", () => {
  test("returns extracted path for 'name' column", () => {
    expect(getLink("name", mockPerson as Person)).toBe("/people/1/");
  });

  test("returns extracted path for a string property", () => {
    expect(getLink("homeworld", mockPerson as Person)).toBe("/planets/1/");
  });

  test("returns '#' for array properties", () => {
    expect(getLink("films", mockPerson as Person)).toBe("#");
  });
});
