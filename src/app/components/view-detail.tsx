"use client";

import Link from "next/link";
import { useSwapi } from "@/app/hooks/useSwapi";
import { extractPath } from "@/lib/url-helpers";
import { Error } from "@/app/components/error";
import { Loading } from "@/app/components/loading";

interface ViewDetailProps {
  slug: "people" | "planets" | "films" | "species";
  id: string;
}

const validSlugs = ["people", "planets", "films", "species"];

export const ViewDetail = ({ slug, id }: ViewDetailProps) => {
  if (!validSlugs.includes(slug)) {
    return <p>Invalid slug</p>;
  }

  const numericId = parseInt(id, 10) || 0;

  const { data, error, isLoading } = useSwapi(slug, 0, undefined, numericId);

  // for some reason "people" images need the characters slug
  let imageUrl = `https://starwars-visualguide.com/assets/img/${
    slug === "people" ? "characters" : slug
  }/${id}.jpg`;

  // exception for Tatooine -- not ideal at all, but prevents the demo from failing to load the main planet image :)
  if (slug === "planets" && id === "1") {
    imageUrl =
      "https://static.wikia.nocookie.net/swtor/images/7/7f/Tatooine.jpg";
  }

  return (
    <div className="mt-2 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold mb-8 uppercase border-2 border-yellow-400 text-yellow-400 p-4 bg-black/70 shadow-lg backdrop-blur-lg rounded-full text-center">
        Star Wars: {slug}
      </h1>

      {error ? <Error /> : null}

      {isLoading ? <Loading /> : null}

      {!error && !isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-in">
          <div className="flex justify-center bg-black rounded-xl overflow-hidden self-start">
            <img
              src={imageUrl}
              alt="Star Wars Image"
              className="w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/image-not-found.webp";
              }}
            />
          </div>

          <div className="p-4 bg-black/70 backdrop-blur-lg rounded-xl">
            <ul className="space-y-4">
              {data &&
                Object.entries(data).map(([key, value]) => {
                  // skip any fields we're not interested in currently
                  if (
                    key === "url" ||
                    key === "created" ||
                    key === "edited" ||
                    key === "starships" ||
                    key === "characters" ||
                    key === "vehicles"
                  ) {
                    return;
                  }

                  // avoid displaying empty fields
                  if (!value || (Array.isArray(value) && value.length === 0))
                    return;

                  return (
                    <li
                      key={key}
                      className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]"
                    >
                      <strong className="w-32 capitalize whitespace-nowrap">
                        {key.replace("_", " ")}:
                      </strong>

                      {(key === "films" ||
                        key === "residents" ||
                        key === "people" ||
                        key === "planets" ||
                        key === "species") &&
                      value &&
                      Array.isArray(value) ? (
                        <ul className="w-auto">
                          {value.map((item: string) => (
                            <li key={item}>
                              {
                                <>
                                  <span className="text-xs uppercase pr-2">
                                    View:
                                  </span>
                                  <Link
                                    href={extractPath(item)}
                                    className="font-bold underline hover:no-underline"
                                  >
                                    {extractPath(item)}
                                  </Link>
                                </>
                              }
                            </li>
                          ))}
                        </ul>
                      ) : key === "homeworld" ? (
                        <span>
                          <Link
                            href={extractPath(value as string)}
                            className="font-bold underline hover:no-underline"
                          >
                            View Planet
                          </Link>
                        </span>
                      ) : (
                        <span className="capitalize">{String(value)}</span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : null}

      <div className="mt-12 mb-4 text-center">
        <Link
          href="/"
          className="w-full p-4 px-20 bg-black/70 border-2 border-yellow-400 text-yellow-400 font-bold rounded-full hover:bg-yellow-400 hover:text-black"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};
