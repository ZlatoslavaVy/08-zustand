"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/notes/action/create/CreateNote.module.css";

export default function CreateNoteClient() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/notes");
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </main>
  );
}
