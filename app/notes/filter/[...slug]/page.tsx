import { Metadata } from "next"
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "@/app/notes/Notes.client";

type MetadataProps = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug ? slug.join("/") : "All";
  return {
    title: `Filter: ${filterName}`,
    description: `NoteHub: Notes filtered by ${filterName}`,
    openGraph: {
  title: `NoteHub Filter: ${filterName}`,
    description: `NoteHub: Notes filtered by ${filterName}`,
    url: `https://08-zustand-tawny-mu.vercel.app/notes/filter/${slug ? slug.join("/") : ""}`,
images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub Filter: ${filterName}`,
        },
      ],
}
  }
}

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