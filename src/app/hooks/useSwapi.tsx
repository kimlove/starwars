import { useQuery } from "@tanstack/react-query";

const fetchSwapiData = async (
  type: string,
  page?: number,
  id?: number,
  searchQuery?: string
) => {
  // Construct URL based on the use case
  const url = id
    ? `https://swapi.dev/api/${type}/${id}/`
    : `https://swapi.dev/api/${type}/?${
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
  page?: number,
  searchQuery?: string,
  id?: number
) => {
  console.log(type, id);

  return useQuery({
    // Unique query key for each use case
    queryKey: ["swapiData", type, id || page, searchQuery],
    queryFn: () => fetchSwapiData(type, page, id, searchQuery),
    staleTime: 60 * 60 * 1000, // Cache for 60 mins
    enabled: !!type && (!!id || !!page), // Only fetch when `type` and either `id` or `page` are defined
  });
};
