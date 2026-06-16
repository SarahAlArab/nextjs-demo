import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "@/app/login/actions";

export default async function Navigation() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("auth-token");

  return (
    <nav className="bg-zinc-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold hover:text-zinc-300 transition-colors">
              📚 BookHub
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="hover:text-zinc-300 transition-colors font-medium">
              Home
            </Link>
            <Link
              href="/books"
              className="hover:text-zinc-300 transition-colors font-medium">
              Books
            </Link>
            <Link
              href="/authors"
              className="hover:text-zinc-300 transition-colors font-medium">
              Authors
            </Link>
            <Link
              href="/publishers"
              className="hover:text-zinc-300 transition-colors font-medium">
              Publishers
            </Link>
            {isLoggedIn ? (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg border border-zinc-600 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  Logout
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-lg bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
