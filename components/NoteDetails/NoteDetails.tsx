import type { Note } from '@/types/note'; 
import css from './NoteDetails.module.css';

type Props = {
  note: Note;
};

export default function NoteDetails({ note }: Props) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      
      {/* Якщо бекенд повертає тег, виводимо його */}
      {note.tag && (
        <span className={css.tag}>{note.tag}</span>
      )}
      
      <p className={css.content}>{note.content}</p>
    </div>
  );
}