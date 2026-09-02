import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/notes"; // Функція має називатися fetchNoteById за ТЗ
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}