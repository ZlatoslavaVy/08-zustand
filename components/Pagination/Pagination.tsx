import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

// 🛠️ Фікс для Vite 8: безпечно витягуємо компонент з об'єкта
const PaginateComponent: typeof ReactPaginate =
  (ReactPaginate as unknown as { default?: typeof ReactPaginate }).default ||
  ReactPaginate;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <PaginateComponent
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      previousClassName={css.prev}
      previousLinkClassName={css.prevLink}
      nextClassName={css.next}
      nextLinkClassName={css.nextLink}
      breakClassName={css.break}
      breakLinkClassName={css.breakLink}
      disabledClassName={css.disabled}
    />
  );
}