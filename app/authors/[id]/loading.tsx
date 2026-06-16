function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`} />;
}

export default function AuthorDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Pulse className="h-4 w-32 mb-6" />

      {/* Author card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-8">
          <Pulse className="w-40 h-40 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Pulse className="h-10 w-56" />
            <Pulse className="h-5 w-32" />
            <div className="space-y-2 pt-2">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-5/6" />
            </div>
            <div className="flex gap-4 pt-2">
              <Pulse className="h-7 w-24 rounded-full" />
              <Pulse className="h-7 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Books section */}
      <Pulse className="h-7 w-40 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
            <Pulse className="h-64 w-full rounded-none" />
            <div className="p-5 space-y-2">
              <Pulse className="h-5 w-3/4" />
              <Pulse className="h-4 w-1/2" />
              <div className="flex justify-between pt-1">
                <Pulse className="h-6 w-16 rounded-full" />
                <Pulse className="h-4 w-10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
