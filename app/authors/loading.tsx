function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`}
    />
  );
}

export default function AuthorsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <Pulse className="h-10 w-48 mb-8" />

      {/* Results count */}
      <Pulse className="h-4 w-28 mb-4" />

      {/* Author card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {/* Avatar + name */}
              <div className="flex items-start gap-4 mb-4">
                <Pulse className="w-20 h-20 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <Pulse className="h-6 w-3/4" />
                  <Pulse className="h-4 w-1/2" />
                </div>
              </div>
              {/* Bio lines */}
              <div className="space-y-2 mb-4">
                <Pulse className="h-4 w-full" />
                <Pulse className="h-4 w-full" />
                <Pulse className="h-4 w-5/6" />
              </div>
              {/* Footer */}
              <div className="flex justify-between">
                <Pulse className="h-4 w-24" />
                <Pulse className="h-6 w-16 rounded-full" />
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
