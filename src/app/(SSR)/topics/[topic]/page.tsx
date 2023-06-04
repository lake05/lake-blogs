import Image from "next/image";
import { UnsplashImage } from "@/models/unsplash";
import { notFound } from "next/navigation";

// export const revalidate = 0;
// export const dynamicParams = false

type Props = {
  params: {
    topic: string;
  };
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
};

export function generateMetadata({ params: { topic } }: Props) {
  return {
    title: topic + "- NestJS 13.4 Image Gallery",
  };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: Props) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?queay=${topic}&count=3&client_id=${process.env.UNSPLAHSH_ACCESS_KEY}`
  );

  if (!response.ok) notFound();

  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      {topic}
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.urls.thumb}
          alt={image.alt_description}
          width={250}
          height={250}
          className="rounded object-cover m-1"
        />
      ))}
    </div>
  );
}
