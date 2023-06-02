import NavBar from "./components/Navbar";

export const metadata = {
  title: "Lake's Blog",
  description: "Created by Lake",
};

export default function TodosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
