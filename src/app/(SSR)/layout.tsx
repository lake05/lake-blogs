import "../globals.css";
import Link from "next/link";

export const metadata = {
  title: "Lake's Blog",
  description: "Created by Lake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
        <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
          <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
            <Link
              href="/static"
              className="text-white/60 text-2xl no-underline hover:text-white"
            >
              Static
            </Link>
            <Link
              href="/dynamic"
              className="text-white/60 text-2xl no-underline hover:text-white"
            >
              Dynamic
            </Link>
            <Link
              href="/topics"
              className="text-white/60 text-2xl no-underline hover:text-white"
            >
              topics
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
