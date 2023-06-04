import { Metadata } from "next";
import SearchPage from "./SearchPage";
import { useState } from "react";
import { UnsplashImage } from "@/models/unsplash";

export const metadata: Metadata = {
  title: "Search - NextJS 13.4 Image Gallery",
};

export default function Page() {
  return <SearchPage />;
}
