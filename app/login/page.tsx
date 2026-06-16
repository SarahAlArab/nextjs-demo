import LoginForm from './LoginForm';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            Welcome to BookHub
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sign in to browse books, authors, and publishers.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-8">
          <LoginForm from={from ?? '/books'} />

          {/* Demo credentials hint */}
          <div className="mt-6 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
              Demo credentials
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Username: <span className="font-mono font-semibold">admin</span>
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Password: <span className="font-mono font-semibold">password</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
