import PublishersClient from "@/components/PublishersClient";
import { getAllBooks, getAllPublishers } from "@/lib/data";
import { delay } from "@/lib/delay";
import { Suspense } from "react";

export default async function PublishersPage() {
  await delay();
  const publishers = getAllPublishers();
  const books = getAllBooks();

  const bookCounts = books.reduce<Record<number, number>>((acc, book) => {
    acc[book.publisherId] = (acc[book.publisherId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Suspense
      fallback={<div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>}>
      <PublishersClient publishers={publishers} bookCounts={bookCounts} />
    </Suspense>
  );
}
