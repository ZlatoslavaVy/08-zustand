import { useRouter } from "next/navigation";
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/app/notes/action/create/CreateNote.module.css";

export const metadata: Metadata = {
  title: " Create Note",
  description: "Create a new note",
  openGraph: {
    title: " Create Note",
    description: "Create a new note",
    url: "https://08-zustand-tawny-mu.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create a Note",
      },
    ],
  },
};

export default function CreateNote() {
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
        {/* NoteForm component */}
        <NoteForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </main>
  );
}
