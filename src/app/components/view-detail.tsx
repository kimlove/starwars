"use client";

import Link from "next/link";
import { useSwapi } from "@/app/hooks/useSwapi";

interface ViewDetailProps {
  slug: string;
  id: string;
}

const validSlugs = ["people", "planets", "films", "species"];

export const ViewDetail = ({ slug, id }: ViewDetailProps) => {
  if (!validSlugs.includes(slug)) {
    return <p>Invalid slug</p>;
  }

  const numericId = parseInt(id, 10) || 0;

  const { data, error, isLoading } = useSwapi(
    slug,
    0,
    undefined,
    parseInt(id, 10)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading details</p>;

  // for some reason "people" images need the characters slug
  let imageUrl = `https://starwars-visualguide.com/assets/img/${
    slug === "people" ? "characters" : slug
  }/${id}.jpg`;

  // exception for Tatooine -- not ideal at all, but prevents the demo from failing to load the
  if (slug === "planets" && id === "1") {
    imageUrl =
      "https://static.wikia.nocookie.net/swtor/images/7/7f/Tatooine.jpg";
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-lg font-bold mb-8 uppercase border-2 border-yellow-400 text-yellow-400 p-2 rounded-xl text-center text-black">
        Star Wars: {slug}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="Star Wars Image"
            className="rounded-lg w-full object-cover"
          />
        </div>

        <div>
          <ul className="space-y-2">
            {data &&
              Object.entries(data).map(([key, value]) => {
                // skip any fields we're not interested in currently
                if (key === "url" || key === "created" || key === "edited") {
                  return;
                }

                // avoid displaying empty fields
                if (!value || (Array.isArray(value) && value.length === 0))
                  return;

                return (
                  <li key={key} className="flex gap-4">
                    <strong className="w-32 capitalize">
                      {key.replace("_", " ")}:
                    </strong>

                    {(key === "films" || key === "residents") &&
                    value &&
                    Array.isArray(value) ? (
                      <ul>
                        {value.map((film: any) => (
                          <li key={film}>{film}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>{String(value)}</span>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          Back to homepage
        </Link>
      </p>
    </div>
  );
};
