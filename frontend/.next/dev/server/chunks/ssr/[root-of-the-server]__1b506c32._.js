module.exports = [
"[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookmarksPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Dev_lnnovations$2f$frontend$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Dev_lnnovations/frontend/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
function parseTags(input) {
    return input.split(",").map((t)=>t.trim()).filter(Boolean);
}
function BookmarksPage() {
    const [bookmarks, setBookmarks] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        title: "",
        url: "",
        description: "",
        tags: "",
        favorite: false
    });
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const params = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const search = new URLSearchParams();
        if (query) search.set("q", query);
        if (tags) search.set("tags", tags);
        return search.toString();
    }, [
        query,
        tags
    ]);
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
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadBookmarks();
    }, [
        params
    ]);
    function resetForm() {
        setForm({
            title: "",
            url: "",
            description: "",
            tags: "",
            favorite: false
        });
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
            headers: {
                "Content-Type": "application/json"
            },
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
        await fetch(`${API_BASE}/api/bookmarks/${id}`, {
            method: "DELETE"
        });
        loadBookmarks();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: "min-h-screen px-6 py-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-6xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-semibold",
                                    children: "Bookmarks"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600",
                                    children: "Save useful links and keep them searchable."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Dev_lnnovations$2f$frontend$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/notes",
                            className: "btn",
                            children: "Go to Notes"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                    lineNumber: 100,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "card p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold",
                                    children: editingId ? "Edit bookmark" : "New bookmark"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                    className: "mt-4 space-y-3",
                                    onSubmit: handleSubmit,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "input",
                                            placeholder: "Title (optional)",
                                            value: form.title,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    title: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "input",
                                            placeholder: "URL",
                                            value: form.url,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    url: e.target.value
                                                }),
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                            className: "input min-h-[120px]",
                                            placeholder: "Description",
                                            value: form.description,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    description: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 125,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "input",
                                            placeholder: "Tags (comma separated)",
                                            value: form.tags,
                                            onChange: (e)=>setForm({
                                                    ...form,
                                                    tags: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: form.favorite,
                                                    onChange: (e)=>setForm({
                                                            ...form,
                                                            favorite: e.target.checked
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 138,
                                                    columnNumber: 17
                                                }, this),
                                                "Mark as favorite"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn",
                                                    type: "submit",
                                                    children: editingId ? "Update" : "Create"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 146,
                                                    columnNumber: 17
                                                }, this),
                                                editingId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn",
                                                    type: "button",
                                                    onClick: resetForm,
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 148,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "card p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold",
                                    children: "Search"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "mt-4 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "input",
                                            placeholder: "Search text",
                                            value: query,
                                            onChange: (e)=>setQuery(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            className: "input",
                                            placeholder: "Filter tags (comma separated)",
                                            value: tags,
                                            onChange: (e)=>setTags(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 170,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                    lineNumber: 108,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                    className: "mt-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold",
                                    children: "Results"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, this),
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-slate-500",
                                    children: "Loading..."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 177,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "mt-4 grid gap-4 md:grid-cols-2",
                            children: bookmarks.map((bookmark)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                                    className: "card p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold",
                                                            children: bookmark.title || "Untitled"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                            lineNumber: 184,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                            className: "mono text-sm text-amber-700 underline",
                                                            href: bookmark.url,
                                                            target: "_blank",
                                                            rel: "noreferrer",
                                                            children: bookmark.url
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                            lineNumber: 185,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, this),
                                                bookmark.favorite && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "badge",
                                                    children: "Favorite"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 194,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-slate-600",
                                            children: bookmark.description
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-wrap gap-2",
                                            children: (bookmark.tags || []).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "badge",
                                                    children: tag
                                                }, tag, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 199,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex flex-wrap gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn",
                                                    onClick: ()=>startEdit(bookmark),
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 203,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    className: "btn",
                                                    onClick: ()=>removeBookmark(bookmark._id),
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, bookmark._id, true, {
                                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
                    lineNumber: 174,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
            lineNumber: 99,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/Dev_lnnovations/frontend/pages/bookmarks.js",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b506c32._.js.map