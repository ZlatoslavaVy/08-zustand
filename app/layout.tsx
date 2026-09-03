import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub: An everyday note-management app featuring category filtering, quick search, and intuitive navigation.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub: An everyday note-management app featuring category filtering, quick search, and intuitive navigation.",
    url: "https://08-zustand-tawny-mu.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({ children, modal }: { children: ReactNode; modal: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main className="container">
            {children}
            {modal}
          </main>
        </TanStackProvider>
      </body>
    </html>
  );
}
