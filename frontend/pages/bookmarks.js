import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

function parseTags(input) {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("");
  const [form, setForm] = useState({ title: "", url: "", description: "", tags: "", favorite: false });
  const [editingId, setEditingId] = useState(null);

  const params = useMemo(() => {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (tags) search.set("tags", tags);
    return search.toString();
  }, [query, tags]);

  async function loadBookmarks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/bookmarks${params ? `?${params}` : ""}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setBookmarks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookmarks();
  }, [params]);

  function resetForm() {
    setForm({ title: "", url: "", description: "", tags: "", favorite: false });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: form.title,
      url: form.url,
      description: form.description,
      tags: parseTags(form.tags),
      favorite: form.favorite
    };

    const isEditing = Boolean(editingId);
    const res = await fetch(`${API_BASE}/api/bookmarks${isEditing ? `/${editingId}` : ""}`, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Request failed");
      return;
    }

    resetForm();
    loadBookmarks();
  }

  function startEdit(bookmark) {
    setEditingId(bookmark._id);
    setForm({
      title: bookmark.title,
      url: bookmark.url,
      description: bookmark.description,
      tags: (bookmark.tags || []).join(", "),
      favorite: Boolean(bookmark.favorite)
    });
  }

  async function removeBookmark(id) {
    if (!confirm("Delete this bookmark?")) return;
    await fetch(`${API_BASE}/api/bookmarks/${id}`, { method: "DELETE" });
    loadBookmarks();
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Bookmarks</h1>
            <p className="text-slate-600">Save useful links and keep them searchable.</p>
          </div>
          <Link href="/notes" className="btn">Go to Notes</Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <section className="card p-6">
            <h2 className="text-lg font-semibold">{editingId ? "Edit bookmark" : "New bookmark"}</h2>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                className="input"
                placeholder="Title (optional)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="input"
                placeholder="URL"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                required
              />
              <textarea
                className="input min-h-[120px]"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                className="input"
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.favorite}
                  onChange={(e) => setForm({ ...form, favorite: e.target.checked })}
                />
                Mark as favorite
              </label>
              <div className="flex flex-wrap gap-3">
                <button className="btn" type="submit">{editingId ? "Update" : "Create"}</button>
                {editingId && (
                  <button className="btn" type="button" onClick={resetForm}>Cancel</button>
                )}
              </div>
            </form>
          </section>

          <section className="card p-6">
            <h2 className="text-lg font-semibold">Search</h2>
            <div className="mt-4 space-y-3">
              <input
                className="input"
                placeholder="Search text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <input
                className="input"
                placeholder="Filter tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </section>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Results</h2>
            {loading && <span className="text-sm text-slate-500">Loading...</span>}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {bookmarks.map((bookmark) => (
              <article key={bookmark._id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{bookmark.title || "Untitled"}</h3>
                    <a
                      className="mono text-sm text-amber-700 underline"
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {bookmark.url}
                    </a>
                  </div>
                  {bookmark.favorite && <span className="badge">Favorite</span>}
                </div>
                <p className="mt-2 text-sm text-slate-600">{bookmark.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(bookmark.tags || []).map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="btn" onClick={() => startEdit(bookmark)}>Edit</button>
                  <button className="btn" onClick={() => removeBookmark(bookmark._id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
