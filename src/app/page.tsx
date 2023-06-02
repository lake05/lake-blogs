import Posts from "./components/Posts";
import MyProfilePic from "./components/MyProfilePic";

// Next.js will trigger a regeneration of the data in the background.
// Once the route generates successfully,
// Next.js will invalidate the cache and show the updated route.
// If the background regeneration fails, the old data would still be unaltered.

export const revalidate = 10;

export default function Home() {
  return (
    <div className="mx-auto">
      <MyProfilePic />
      <p className="mt-12 mb-12 text-3xl text-center">
        Hello and Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Lake</span>
        </span>
      </p>
      {/* @ts-expect-error Server Component */}
      <Posts />
    </div>
  );
}
