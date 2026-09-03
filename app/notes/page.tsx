import { Metadata } from "next";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "./Notes.client";

export const metadata: Metadata = {
  title: "NoteHub Notes",
  description: "Browse and manage your notes in NoteHub.",
  openGraph: {
    title: "NoteHub Notes",
    description: "Browse and manage your notes in NoteHub.",
    url: "https://vercel.com/zlatoslava-vy/08-zustand/settings/domains/notes",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Notes",
      },
    ],
  },
};

export default async function NotesPage() {
  // Створюємо новий екземпляр QueryClient для серверного запиту
  const queryClient = new QueryClient();

  // Виконуємо prefetch (попереднє завантаження) даних.
  // ВАЖЛИВО: queryKey та аргументи fetchNotes мають точно збігатися
  // з початковими значеннями в NotesClient (search = "", page = 1)
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  return (
    // Передаємо дегідратований стан у клієнтський компонент
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
