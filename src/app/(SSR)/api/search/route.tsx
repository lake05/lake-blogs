import { NextResponse } from "next/server";
import { UnsplashSearchResponse } from "@/models/unsplash";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provider" }, { status: 404 });
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLAHSH_ACCESS_KEY}`
  );

  const { results }: UnsplashSearchResponse = await response.json();

  return NextResponse.json(results);
}
