import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "@/app/notes/Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Витягуємо тег
  const tagParam = slug?.[0] || "all";
  const tag = tagParam.toLowerCase() === "all" ? undefined : tagParam;

  const queryClient = new QueryClient();

  // Робимо prefetch запит ВЖЕ З УРАХУВАННЯМ ТЕГУ
  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag], 
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Передаємо тег у NotesClient, щоб він знав, що ми відфільтрували */}
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}