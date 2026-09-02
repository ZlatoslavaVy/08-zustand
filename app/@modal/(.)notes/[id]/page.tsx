import Modal from '@/components/Modal/Modal';
import NoteDetails from "@/components/NoteDetails/NoteDetails"
import { fetchNoteById } from '@/lib/api/notes';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  
  
  // Отримуємо дані конкретної нотатки за її id з API
  const note = await fetchNoteById(id);

  if (!note) {
    return null; // або можна повернути повідомлення про помилку
  }

  return (
    <Modal>
      <NoteDetails note={note}/>
    </Modal>
  );
}