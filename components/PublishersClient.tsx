"use client";

import { Publisher } from "@/lib/data";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PublishersClientProps {
  publishers: Publisher[];
  bookCounts: Record<number, number>;
}

type SortField = "name" | "country" | "foundedYear" | "bookCount";
type SortDir = "asc" | "desc";

function SortIcon({
  active,
  dir,
}: {
  field: string;
  active: boolean;
  dir: SortDir;
}) {
  if (!active) return <span className="ml-1 text-zinc-400">↕</span>;
  return <span className="ml-1">{dir === "asc" ? "↑" : "↓"}</span>;
}

export default function PublishersClient({
  publishers,
  bookCounts,
}: PublishersClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortField = (searchParams.get("sort") ?? "name") as SortField;
  const sortDir = (searchParams.get("dir") ?? "asc") as SortDir;
  const filterCountry = searchParams.get("country") ?? "all";

  const countries = [
    "all",
    ...Array.from(new Set(publishers.map((p) => p.country))).sort(),
  ];

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      updateParams({ dir: sortDir === "asc" ? "desc" : "asc" });
    } else {
      updateParams({ sort: field, dir: "asc" });
    }
  };

  const handleFilterCountry = (country: string) => {
    updateParams({ country: country === "all" ? null : country });
  };

  const filtered = publishers.filter(
    (p) => filterCountry === "all" || p.country === filterCountry,
  );

  const sorted = [...filtered].sort((a, b) => {
    let aVal: string | number;
    let bVal: string | number;

    switch (sortField) {
      case "bookCount":
        aVal = bookCounts[a.id] ?? 0;
        bVal = bookCounts[b.id] ?? 0;
        break;
      case "foundedYear":
        aVal = a.foundedYear;
        bVal = b.foundedYear;
        break;
      case "country":
        aVal = a.country;
        bVal = b.country;
        break;
      default:
        aVal = a.name;
        bVal = b.name;
    }

    if (typeof aVal === "string") {
      const cmp = aVal.localeCompare(bVal as string);
      return sortDir === "asc" ? cmp : -cmp;
    }
    return sortDir === "asc"
      ? aVal - (bVal as number)
      : (bVal as number) - aVal;
  });

  const thClass =
    "px-6 py-3 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider select-none";
  const thButtonClass =
    "flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors cursor-pointer";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Filter by country:
        </label>
        <div className="flex flex-wrap gap-2">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => handleFilterCountry(country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterCountry === country
                  ? "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}>
              {country === "all" ? "All Countries" : country}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        {sorted.length} {sorted.length === 1 ? "publisher" : "publishers"}
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className={thClass}>
                <button
                  className={thButtonClass}
                  onClick={() => handleSort("name")}>
                  Name
                  <SortIcon
                    field="name"
                    active={sortField === "name"}
                    dir={sortDir}
                  />
                </button>
              </th>
              <th className={thClass}>
                <button
                  className={thButtonClass}
                  onClick={() => handleSort("country")}>
                  Country
                  <SortIcon
                    field="country"
                    active={sortField === "country"}
                    dir={sortDir}
                  />
                </button>
              </th>
              <th className={thClass}>
                <button
                  className={thButtonClass}
                  onClick={() => handleSort("foundedYear")}>
                  Founded
                  <SortIcon
                    field="foundedYear"
                    active={sortField === "foundedYear"}
                    dir={sortDir}
                  />
                </button>
              </th>
              <th className={thClass}>
                <button
                  className={thButtonClass}
                  onClick={() => handleSort("bookCount")}>
                  Books
                  <SortIcon
                    field="bookCount"
                    active={sortField === "bookCount"}
                    dir={sortDir}
                  />
                </button>
              </th>
              <th className={thClass}>Website</th>
              <th className={`${thClass} text-right`}>Details</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-800">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400">
                  No publishers found.
                </td>
              </tr>
            ) : (
              sorted.map((publisher) => (
                <tr
                  key={publisher.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="font-semibold text-zinc-900 dark:text-zinc-50 hover:underline">
                      {publisher.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {publisher.country}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {publisher.foundedYear}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {bookCounts[publisher.id] ?? 0}{" "}
                      {(bookCounts[publisher.id] ?? 0) === 1 ? "book" : "books"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={publisher.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors truncate max-w-[180px] block">
                      {publisher.website.replace(/^https?:\/\//, "")}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline">
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
