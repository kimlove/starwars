"use client";

import { useEffect, useState } from "react";

interface Person {
  name: string;
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

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people`);

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
  }, []);

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
          {people.results.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </div>
    );
  }
};
