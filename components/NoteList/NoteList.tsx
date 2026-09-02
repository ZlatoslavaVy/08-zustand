"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api/notes";
import css from "@/components/NoteList/NoteList.module.css";
import type {Note} from "@/types/note";


interface NoteListProps {
notes: Note[],
}

export default function NoteList({notes}: NoteListProps) {

      const queryClient = useQueryClient();
  // Мутація на видалення нотатки
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>

{/* Додаємо посилання View details перед кнопкою Delete */}
            <Link href={`/notes/${note.id}`}>View details</Link>

{/* Викликаємо мутацію напряму */}
          <button 
          className={css.button} 
          onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
            </button>
        </div>
      </li>
    ))}
    </ul>
  );
}
