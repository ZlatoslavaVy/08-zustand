import css from "./NotesPage.module.css";

type Props = {
  children: React.ReactNode;
};

export default function NotesPage({ children }: Props) {
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        {/* Тут може бути кнопка створення нотатки або пошук */}
      </div>
      <div>{children}</div>
    </div>
  );
}