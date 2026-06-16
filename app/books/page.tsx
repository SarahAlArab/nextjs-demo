import BooksClient from "@/components/BooksClient";
import { getAllAuthors, getAllBooks } from "@/lib/data";
import { delay } from "@/lib/delay";
import { Suspense } from "react";

export default async function BooksPage() {
  await delay();
  const books = getAllBooks();
  const authors = getAllAuthors();

  return (
    <Suspense
      fallback={<div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>}>
      <BooksClient initialBooks={books} authors={authors} />
    </Suspense>
  );
}
