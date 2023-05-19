import NavBar from "./components/NavBar";
import MyProfilePic from "./components/MyProfilePic";

import "./globals.css";

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
    <html lang="en">
      <body>
        <NavBar />
        <MyProfilePic />
        {children}
      </body>
    </html>
  );
}
