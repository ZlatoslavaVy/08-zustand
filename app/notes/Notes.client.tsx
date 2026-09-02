"use client";

import { useState } from "react";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api/notes";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

// Зверни увагу: переконайся, що імпортуєш правильний файл стилів для цієї сторінки
import css from "@/components/NotesPage/NotesPage.module.css"; 

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({initialTag}: NotesClientProps) {
  const [queryInput, setQueryInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Відкладений пошук
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setQueryInput(value);
    debouncedSearch(value);
  };

  // Запит на отримання нотаток
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, currentPage, initialTag],
    queryFn: () => fetchNotes({ page: currentPage, perPage: 12, search, tag: initialTag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });


  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={queryInput} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {/* Індикатори завантаження та помилки */}
      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}

      {/* Список нотаток */}
      {notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      {/* Модальне вікно для створення нотатки */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}