"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";
import {useRouter} from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [router]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
}