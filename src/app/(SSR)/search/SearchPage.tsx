"use client";
import Image from "next/image";
import { UnsplashImage } from "@/models/unsplash";
import { FormEvent, useState } from "react";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] =
    useState<boolean>(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formDate = new FormData(e.target as HTMLFormElement);
    // const query = formDate.get("query")?.toString().trim();

    const query = "dogs";
    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch(`/api/search?query=` + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div className="p-5">
      <form id="myForm" onSubmit={handleSubmit}>
        <label className="mr-2" htmlFor="query">
          search query
        </label>
        <input
          className="text-black pl-2"
          id="query"
          type="text"
          placeholder="E.g. cats, hotdogs,..."
          value="dogs"
        />

        <button
          disabled={searchResultsLoading}
          type="submit"
          className="block mt-4 border-emerald-600 border-2 px-2"
        >
          提交
        </button>
      </form>

      <div className="flex flex-col items-center ">
        {searchResultsLoading && <p>Loading</p>}
        {searchResultsLoadingIsError && (
          <p>Something went wrong. Please try again.</p>
        )}
        {searchResults?.length === 0 && (
          <p>Noting found. Try a different query!</p>
        )}

        {searchResults && (
          <>
            {searchResults.map((image) => (
              <Image
                src={image.urls.thumb}
                width={250}
                height={250}
                alt={image.alt_description}
                key={image.urls.thumb}
                className="rounded object-cover m-1"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
