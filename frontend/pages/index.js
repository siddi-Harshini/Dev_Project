import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-4xl card p-12">
        <h1 className="text-4xl font-semibold">Personal Notes & Bookmark Manager</h1>
        <p className="mt-4 text-lg text-slate-600">
          A focused workspace to capture quick notes and save meaningful links.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/notes" className="btn">Go to Notes</Link>
          <Link href="/bookmarks" className="btn">Go to Bookmarks</Link>
        </div>
        <div className="mt-10 mono text-sm text-slate-500">
          Tip: Set <span className="text-amber-700">NEXT_PUBLIC_API_BASE</span> to point at your backend.
        </div>
      </div>
    </main>
  );
}
