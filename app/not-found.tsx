import type { Metadata } from "next";
import css from "@/app/not-found.module.css"

export const metadata: Metadata = {
  title: "Not Found - 404",
  description: "NoteHub: Sorry, that page doesn't exist",
openGraph: {
  title: "NoteHub Not Found - 404",
    description: "NoteHub: Sorry, that page doesn't exist",
url: "https://08-zustand-tawny-mu.vercel.app/not-found",
images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub Not Found - 404",
        },
      ],
}
};

const NotFound = () => {
    return (
        <div>
        <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
</div>
    )
}

export default NotFound;