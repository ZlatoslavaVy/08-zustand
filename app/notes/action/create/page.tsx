import { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: " Create Note",
  description: "Create a new note",
  openGraph: {
    title: " Create Note",
    description: "Create a new note",
    url: "https://08-zustand-tawny-mu.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a Note",
      },
    ],
  },
};

export default function CreateNote() {
  return <CreateNoteClient />;
}
