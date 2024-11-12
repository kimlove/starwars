"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Pagination } from "@/app/components/ui/pagination";
import { getLink } from "@/lib/url-helpers";
import { Person, PeopleData } from "@/types/apiData";

export const People = () => {
  const [people, setPeople] = useState<PeopleData | null>(null);
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        // This logic isn't ideal, but just testing initial search functionality -- we'll clean up later
        if (searchQuery) {
          setStatus("loading");
          const response = await fetch(
            `https://swapi.dev/api/people/?search=${searchQuery}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch people");
          }

          const data = await response.json();
          setPeople(data);
          setStatus("idle");
          return;
        }

        const response = await fetch(
          `https://swapi.dev/api/people/?page=${page}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }

        const data = await response.json();
        setPeople(data);
        setStatus("idle");
      } catch (error) {
        setStatus("error");
        console.error("Error fetching people:", error);
      }
    };

    fetchPeople();
  }, [page, searchQuery]);

  const updatePageHandler = (newPage: number) => {
    setStatus("loading");
    setPage(newPage);
  };

  const searchQueryQueryHandler = (query: string) => {
    setSearchQuery(query);
  };

  if (status === "error") {
    return <div>Error fetching people</div>;
  }

  const itemsPerPage = 10;

  const cellPadding = "p-2 px-4";

  const columns: {
    label: string;
    key: keyof Person;
    align?: string;
    isLink?: boolean;
  }[] = [
    { label: "Name", key: "name", isLink: true, align: "text-left" },
    { label: "Height", key: "height" },
    { label: "Mass", key: "mass" },
    { label: "Hair Color", key: "hair_color" },
    { label: "Skin Colour", key: "skin_color" },
    { label: "Eye Colour", key: "eye_color" },
    { label: "Birth Year", key: "birth_year" },
    { label: "Gender", key: "gender" },
    { label: "Homeworld", key: "homeworld", isLink: true },
  ];

  return (
    <div>
      <div className="my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => searchQueryQueryHandler(e.target.value)}
          placeholder="SearchQuery"
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>

      {!people && status === "loading" ? <div>Loading...</div> : null}

      {people && people.results.length >= 1 ? (
        <>
          <Pagination
            count={people.count}
            itemsPerPage={itemsPerPage}
            next={people.next}
            page={page}
            previous={people.previous}
            status={status}
            updatePageHandler={updatePageHandler}
          />

          <table
            className={`bg-gray-900 w-full${
              status === "loading" ? " opacity-30" : ""
            }`}
          >
            <thead>
              <tr className="bg-slate-700">
                {columns.map((column, index) => (
                  <th key={index} className={`${cellPadding} text-left`}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {people.results.map((person) => {
                return (
                  <tr key={person.name} className="capitalize">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${cellPadding} ${
                          column.align ? column.align : "text-right"
                        }`}
                      >
                        {column.isLink ? (
                          <Link
                            href={getLink(column.key, person)}
                            className="font-bold underline hover:no-underline"
                          >
                            {column.key === "name" ? person.name : "View"}
                          </Link>
                        ) : (
                          (person[column.key] as string)
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};
