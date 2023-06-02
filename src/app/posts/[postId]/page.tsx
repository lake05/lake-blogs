import getFomattedDate from "@/lib/getFormattedDate";
import { getPostsByName } from "@/lib/post";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

type Props = {
  params: {
    postId: string;
  };
};

// export async function generateStaticParams() {
//   const posts = await getPostsMeta(); // dedupe!

//   if (!posts) return [];

//   return posts.map((post) => ({
//     postId: post.id,
//   }));
// }

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostsByName(`${postId}.mdx`); // dedupe!

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostsByName(`${postId}.mdx`); // dedupe!
  if (!post) notFound();

  const { meta, content } = post;

  const pubDate = getFomattedDate(meta.date);

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <>
      <h1 className="text-3xl mt-4 mb-0">{meta.title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
}
