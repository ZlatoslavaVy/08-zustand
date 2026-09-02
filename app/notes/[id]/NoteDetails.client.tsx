"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/notes";
import css from "@/components/NoteDetails/NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  // Опрацювання стану завантаження
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  // Опрацювання помилки або відсутності нотатки
  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  // Якщо дані є, відмальовуємо нотатку
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        {/* Залежно від того, як поле дати називається у твоєму бекенді, 
            можливо, тут буде note.createdAt або note.date */}
        <p className={css.date}>{note.createdAt}</p> 
      </div>
    </div>
  );
}