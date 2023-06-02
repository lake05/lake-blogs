import { compileMDX } from "next-mdx-remote/rsc";

type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

export async function getPostsByName(
  fileName: string
): Promise<BlogPost | undefined> {
  console.log("getPostsByName");

  const res = await fetch(
    `https://raw.githubusercontent.com/lake05/blogposts/main/${fileName}`
  );

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
    tags: string[];
  }>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
    },
  });

  const id = fileName.replace(/\.mdx$/, "");
  const blogPost: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  };

  return blogPost;
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/lake05/blogposts/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const repoFiletree: Filetree = await res.json();
  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"));

  const posts: Meta[] = [];

  for (const file of filesArray) {
    // 在 forEach 中使用 async/await 时，异步操作并不会等待前一个操作结束再执行下一个，而是会同时执行多个异步操作
    const post = await getPostsByName(file);

    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts;
}
