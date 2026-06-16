function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`}
    />
  );
}

export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <Pulse className="h-10 w-48 mb-8" />

      {/* SearchBar */}
      <Pulse className="h-11 w-full mb-8 rounded-lg" />

      {/* Genre filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["w-24", "w-20", "w-28", "w-16", "w-24", "w-20"].map((w, i) => (
          <Pulse key={i} className={`h-9 rounded-full ${w}`} />
        ))}
      </div>

      {/* Results count */}
      <Pulse className="h-4 w-32 mb-4" />

      {/* Book card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
            <Pulse className="h-80 w-full rounded-none" />
            <div className="p-6 space-y-3">
              <Pulse className="h-5 w-3/4" />
              <Pulse className="h-4 w-1/2" />
              <div className="flex justify-between pt-1">
                <Pulse className="h-6 w-20 rounded-full" />
                <Pulse className="h-4 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <Pulse key={i} className="h-9 w-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
