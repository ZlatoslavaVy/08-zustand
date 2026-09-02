import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "./Notes.client";

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