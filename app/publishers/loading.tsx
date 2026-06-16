function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`}
    />
  );
}

export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <Pulse className="h-10 w-48 mb-8" />

      {/* Filter pills */}
      <div className="flex items-center gap-4 mb-6">
        <Pulse className="h-4 w-32" />
        <div className="flex gap-2">
          {['w-24', 'w-28', 'w-32'].map((w, i) => (
            <Pulse key={i} className={`h-9 rounded-full ${w}`} />
          ))}
        </div>
      </div>

      {/* Count */}
      <Pulse className="h-4 w-28 mb-4" />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
        {/* Header */}
        <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 grid grid-cols-6 gap-4">
          {["w-16", "w-16", "w-16", "w-12", "w-24", "w-12"].map((w, i) => (
            <Pulse key={i} className={`h-3 ${w}`} />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 px-6 py-4 grid grid-cols-6 gap-4 border-t border-zinc-200 dark:border-zinc-800">
            <Pulse className="h-4 w-32" />
            <Pulse className="h-4 w-24" />
            <Pulse className="h-4 w-10" />
            <Pulse className="h-6 w-16 rounded-full" />
            <Pulse className="h-4 w-28" />
            <Pulse className="h-4 w-10 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
