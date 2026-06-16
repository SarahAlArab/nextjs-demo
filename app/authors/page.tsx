import Pagination from "@/components/Pagination";
import { getAllAuthors, getBooksByAuthorId } from "@/lib/data";
import { delay } from "@/lib/delay";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 6;

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  await delay();
  const authors = getAllAuthors();

  const totalPages = Math.ceil(authors.length / ITEMS_PER_PAGE);
  const currentPage = Math.max(
    1,
    Math.min(Number(page ?? "1"), Math.max(1, totalPages)),
  );
  const paginatedAuthors = authors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Authors
      </h1>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
        {Math.min(currentPage * ITEMS_PER_PAGE, authors.length)} of{" "}
        {authors.length} authors
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedAuthors.map((author) => {
          const bookCount = getBooksByAuthorId(author.id).length;

          return (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={author.imageUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                      {author.name}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                      {author.nationality}
                    </p>
                  </div>
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
                  {author.bio}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Born: {author.birthYear}
                  </span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-700 dark:text-zinc-300">
                    {bookCount} {bookCount === 1 ? "book" : "books"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Suspense>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Suspense>
    </div>
  );
}
