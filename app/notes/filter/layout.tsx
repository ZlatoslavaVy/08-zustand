import { ReactNode } from "react";
import css from "@/components/LayoutNotes/LayoutNotes.module.css"

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      {/* Рендеримо сайдбар */}
      <aside className={css.sidebar}>
        {sidebar}
      </aside>
      
      {/* Рендеримо список нотаток */}
      <div className={css.notesWrapper}>
        {children}
      </div>
    </div>
  );
}
