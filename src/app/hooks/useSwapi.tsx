import { useQuery } from "@tanstack/react-query";

const fetchSwapiData = async (
  type: string,
  page: number,
  searchQuery: string
) => {
  const url = `https://swapi.dev/api/${type}/?${
    searchQuery ? `search=${searchQuery}` : `page=${page}`
  }`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}`);
  }
  return response.json();
};

export const useSwapi = (
  type: "people" | "planets",
  page: number,
  searchQuery: string
) => {
  return useQuery({
    queryKey: ["swapiData", type, page, searchQuery],
    queryFn: () => fetchSwapiData(type, page, searchQuery),
    staleTime: 60 * 60 * 1000, // cache for 60 mins
    enabled: !!type,
  });
};
