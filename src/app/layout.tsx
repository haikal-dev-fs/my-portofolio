import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Project Manager & Fullstack Engineer",
  description: "Personal portfolio showcasing projects and experience as a Project Manager and Fullstack Engineer",
  keywords: "project manager, fullstack engineer, portfolio, web development",
  authors: [{ name: "Haikal Alfandi" }],
  openGraph: {
    title: "Portfolio - Project Manager & Fullstack Engineer",
    description: "Personal portfolio showcasing projects and experience",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-primary-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
