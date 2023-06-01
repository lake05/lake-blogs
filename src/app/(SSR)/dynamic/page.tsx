import Image from "next/image";
import { UnsplashImage } from "@/models/unsplash-image";
import Link from "next/link";

export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLAHSH_API_KEY}`,
    {
      // cache: "no-cache",
      // next: { revalidate: 0 },
    }
  );

  if (!response.ok) return <div>Not found !</div>;

  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  console.log(image.urls.thumb);

  return (
    <div className="flex flex-col items-center p-4">
      <Image
        src={image.urls.thumb}
        alt={image.alt_description}
        width={width}
        height={height}
        className="rounded shadow min-w-full h-auto"
      />
      by
      <Link href={"static/user/" + image.user.username}>
        {image.user.username}
      </Link>
    </div>
  );
}
