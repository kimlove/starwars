"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Person {
  name: string;
  url: string;
}

interface PeopleData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

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

      {status === "loading" ? <div>Loading...</div> : null}

      {people ? (
        <>
          <ul>
            {people.results.map((person) => {
              // we want to get the resource type and id from the url which we're reuse to create the link
              const link = person.url.split("/api")[1];

              return (
                <li key={person.name}>
                  <Link href={link} className="hover:underline">
                    {person.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="my-4">
            Current page: <strong>{page}</strong>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => updatePageHandler(page - 1)}
              className="border border-gray-300 rounded-md px-2 py-1 disabled:opacity-50"
              disabled={!people.previous}
            >
              Previous
            </button>
            <button
              onClick={() => updatePageHandler(page + 1)}
              className="border border-gray-300 rounded-md px-2 py-1 disabled:opacity-50"
              disabled={!people.next}
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
