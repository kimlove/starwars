"use client";

import { useState } from "react";
import Link from "next/link";

import { useSwapi } from "@/app/hooks/useSwapi";

import { SearchInput } from "@/app/components/ui/search-input";
import { Pagination } from "@/app/components/ui/pagination";
import { getLink } from "@/lib/url-helpers";
import { Person } from "@/types/apiData";

export const People = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error, isLoading } = useSwapi("people", page, searchQuery);

  if (error) return <div>Error: {error.message}</div>;

  const updatePageHandler = (newPage: number) => {
    setPage(newPage);
  };

  const searchQueryQueryHandler = (query: string) => {
    setSearchQuery(query);
  };

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
    // { label: "Hair Color", key: "hair_color" },
    // { label: "Skin Colour", key: "skin_color" },
    // { label: "Eye Colour", key: "eye_color" },
    { label: "Birth Year", key: "birth_year" },
    { label: "Gender", key: "gender" },
    { label: "Homeworld", key: "homeworld", isLink: true },
  ];

  return (
    <div>
      <SearchInput
        searchQuery={searchQuery}
        searchQueryQueryHandler={searchQueryQueryHandler}
      />

      {data && data.results.length >= 1 ? (
        <>
          <Pagination
            count={data.count}
            itemsPerPage={itemsPerPage}
            next={data.next}
            page={page}
            previous={data.previous}
            isLoading={isLoading}
            updatePageHandler={updatePageHandler}
          />

          <table
            className={`bg-black/70 backdrop-blur-lg rounded-xl overflow-hidden w-full${
              isLoading ? " opacity-30" : ""
            }`}
          >
            <thead>
              <tr className="bg-white/5">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`${cellPadding} ${
                      column.align ? column.align : "text-right"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.results.map((person: Person) => {
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
