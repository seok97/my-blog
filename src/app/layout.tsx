import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Dev Blog",
  description: "A fast, modern web blog with aesthetic vanilla CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-content">
            <Link href="/" className="logo">MyBlog.</Link>
            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/" className="nav-link">About</Link>
            </nav>
          </div>
        </header>
        <main className="main-content">
          {children}
        </main>
        <footer className="footer">
          <p>© 2026 MyBlog by Antigravity. Built with Next.js & Vanilla CSS.</p>
        </footer>
      </body>
    </html>
  );
}
