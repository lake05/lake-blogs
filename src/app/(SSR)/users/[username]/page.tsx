import { UnsplashUser } from "@/models/unsplash";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// import { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLAHSH_ACCESS_KEY}`
  );
  if (!response.ok) notFound();

  return await response.json();
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);

  return {
    title:
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username + " = Next.js 13.4 Image Gallery",
  };
}

export default async function Page({ params: { username } }: Props) {
  const user = await getUser(username);

  return (
    <div>
      <h1>{user.username}</h1>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <Link href={"http://unsplash.com/" + username}>Unsplash profile</Link>
    </div>
  );
}
