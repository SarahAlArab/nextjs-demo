import {
  getAuthorById,
  getBooksByPublisherId,
  getPublisherById,
} from "@/lib/data";
import { delay } from "@/lib/delay";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PublisherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await delay();
  const publisher = getPublisherById(parseInt(id));

  if (!publisher) {
    notFound();
  }

  const books = getBooksByPublisherId(publisher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/publishers"
        className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block transition-colors">
        ← Back to Publishers
      </Link>

      {/* Publisher header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
              {publisher.name}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              {publisher.country} · Est. {publisher.foundedYear}
            </p>
          </div>
          <a
            href={publisher.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap self-start">
            Visit Website ↗
          </a>
        </div>

        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
          {publisher.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-5 py-3 text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {publisher.foundedYear}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Founded
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-5 py-3 text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {books.length}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {books.length === 1 ? "Book" : "Books"} in Catalogue
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg px-5 py-3 text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {publisher.country}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Country
            </p>
          </div>
        </div>
      </div>

      {/* Books catalogue */}
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        Published Titles
      </h2>

      {books.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          No books found for this publisher.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => {
            const author = getAuthorById(book.authorId);

            return (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    by {author?.name}
                  </p>
                  <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
