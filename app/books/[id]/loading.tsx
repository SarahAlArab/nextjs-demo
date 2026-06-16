function Pulse({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-700 ${className}`}
    />
  );
}

export default function BookDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Pulse className="h-4 w-28 mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cover image */}
        <div className="lg:col-span-1">
          <Pulse className="w-full aspect-[2/3] rounded-lg" />
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <Pulse className="h-10 w-3/4" />
          <Pulse className="h-5 w-1/2" />
          <div className="flex gap-3 py-2">
            <Pulse className="h-7 w-24 rounded-full" />
            <Pulse className="h-7 w-16 rounded-full" />
            <Pulse className="h-7 w-20 rounded-full" />
          </div>
          <div className="space-y-2 pt-2">
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-full" />
            <Pulse className="h-4 w-5/6" />
            <Pulse className="h-4 w-4/6" />
          </div>
          <Pulse className="h-11 w-36 rounded-lg mt-4" />
        </div>
      </div>

      {/* More books section */}
      <div className="mt-16">
        <Pulse className="h-7 w-56 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
              <Pulse className="h-48 w-full rounded-none" />
              <div className="p-4 space-y-2">
                <Pulse className="h-4 w-3/4" />
                <Pulse className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
