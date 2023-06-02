import NavBar from "./components/NavBar";
import { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lake's Blog",
  description: "Created by Lake",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="px-4 md:px-6 prose-xl prose-slate dark:prose-invert mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
