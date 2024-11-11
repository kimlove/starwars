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

  useEffect(() => {
    const fetchPeople = async () => {
      try {
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
  }, [page]);

  const updatePageHandler = (newPage: number) => {
    setStatus("loading");
    setPage(newPage);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error fetching people</div>;
  }

  if (status === "idle" && people) {
    return (
      <div>
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
      </div>
    );
  }
};
