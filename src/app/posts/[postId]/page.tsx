import getFomattedDate from "@/lib/getFormattedDate";
import { getPostDate, getSortedPostsData } from "@/lib/post";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const posts = getSortedPostsData(); // dedupe!

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export function generateMetadata({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const posts = getSortedPostsData(); // dedupe!
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const posts = getSortedPostsData(); // dedupe!
  const { postId } = params;

  if (!posts.find((post) => post.id === postId)) {
    return notFound();
  }

  const { title, date, contentHtml } = await getPostDate(postId);

  const pubDate = getFomattedDate(date);

  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="mt-0">{pubDate}</p>
      <article>
        <section
          dangerouslySetInnerHTML={{
            __html: contentHtml,
          }}
        ></section>

        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  );
}
