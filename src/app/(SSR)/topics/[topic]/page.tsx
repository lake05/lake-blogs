import Image from "next/image";
import { UnsplashImage } from "@/models/unsplash-image";

type Props = {
  params: {
    topic: string;
  };
  // searchParams: {
  //   [key: string]: string | string[] | undefined;
  // };
};

export const revalidate = 0;

export default async function Page({ params: { topic } }: Props) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?queay=${topic}&count=3&client_id=${process.env.UNSPLAHSH_API_KEY}`
  );

  if (!response.ok) return <div>Not found !</div>;

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
