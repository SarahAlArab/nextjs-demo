function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`}
    />
  );
}

export default function PublisherDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Pulse className="h-4 w-36 mb-6" />

      {/* Publisher info card */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <Pulse className="h-10 w-56" />
            <Pulse className="h-4 w-40" />
          </div>
          <Pulse className="h-10 w-32 rounded-lg self-start" />
        </div>
        <div className="space-y-2 mb-6">
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-5/6" />
        </div>
        <div className="flex gap-4">
          <Pulse className="h-16 w-28 rounded-lg" />
          <Pulse className="h-16 w-28 rounded-lg" />
          <Pulse className="h-16 w-28 rounded-lg" />
        </div>
      </div>

      {/* Books section */}
      <Pulse className="h-7 w-40 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
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
