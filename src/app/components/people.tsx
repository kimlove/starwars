"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { useSwapi } from "@/app/hooks/useSwapi";

import { SearchInput } from "@/app/components/ui/search-input";
import { Pagination } from "@/app/components/ui/pagination";
import { Error } from "@/app/components/error";
import { Loading } from "@/app/components/loading";
import { getLink } from "@/lib/url-helpers";
import { Person } from "@/types/apiData";

export const People = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const { data, error, isLoading } = useSwapi(
    "people",
    page,
    debouncedSearchQuery
  );

  // Debounce the search query -- useEffect not always ideal, but fine for this use case
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (error) {
    return (
      <div>
        <Error />
      </div>
    );
  }

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
    width?: string;
    align?: string;
    isLink?: boolean;
  }[] = [
    {
      label: "Name",
      key: "name",
      width: "w-64",
      isLink: true,
      align: "text-left",
    },
    { label: "Height", key: "height", width: "w-40" },
    { label: "Mass", key: "mass", width: "w-40" },
    { label: "Birth Year", key: "birth_year", width: "w-40" },
    { label: "Gender", key: "gender", width: "w-40" },
    { label: "Homeworld", key: "homeworld", isLink: true, width: "w-40" },
  ];

  return (
    <div>
      <SearchInput
        searchQuery={searchQuery}
        searchQueryQueryHandler={searchQueryQueryHandler}
      />

      <Pagination
        count={data?.count}
        itemsPerPage={itemsPerPage}
        next={data?.next}
        page={page}
        previous={data?.previous}
        isLoading={isLoading}
        updatePageHandler={updatePageHandler}
      />

      {isLoading ? <Loading /> : null}

      {data && data.results.length >= 1 ? (
        <>
          <table
            className={`bg-black/70 backdrop-blur-lg shadow-xl rounded-xl overflow-hidden w-full fade-in${
              isLoading ? " opacity-30" : ""
            }`}
          >
            <thead>
              <tr className="bg-white/5 text-xs uppercase">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`${cellPadding} ${
                      column.width ? column.width : "w-auto"
                    } ${column.align ? column.align : "text-right"}`}
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
