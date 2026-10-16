import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little Universe Called Rasmalai",
  description: "A little universe, made only for you. A birthday story written in the stars.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
