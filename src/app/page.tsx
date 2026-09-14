import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-carbon">
          Bookstore
        </h1>
        <p className="font-sans text-stormy-teal">
          Manage your bookshop, or browse and order books from your favorite bookshop.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/login"
          className="h-11 flex items-center justify-center rounded-full bg-seaweed px-5 font-semibold text-carbon"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="h-11 flex items-center justify-center rounded-full bg-seaweed px-5 font-semibold text-carbon"
        >
          Sign up as a client
        </Link>
        <Link
          href="/register-bookshop"
          className="h-11 flex items-center justify-center rounded-full bg-seaweed px-5 font-semibold text-carbon"
        >
          Sign up as a bookshop
        </Link>
      </div>
    </main>
  );
}