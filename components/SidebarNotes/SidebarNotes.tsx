import Link from "next/link";
import css from "./SidebarNotes.module.css"; // Тут цей шлях спрацює, бо стилі лежать поруч!

// Використовуємо лише ті теги, які підтримує бекенд NoteHub
const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <nav>
      <ul className={css.menuList}>
        {/* Статичне посилання для всіх нотаток */}
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        
        {/* Динамічний рендер списку тегів */}
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}