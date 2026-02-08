const Bookmark = require("../models/Bookmark");
const { parseTags, isValidObjectId, isValidUrl } = require("../utils/validators");
const { fetchTitle } = require("../utils/fetchTitle");

function buildQuery(q, tags) {
  const query = {};
  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [{ title: regex }, { description: regex }, { url: regex }, { tags: regex }];
  }
  if (tags && tags.length > 0) {
    query.tags = { $all: tags.map((t) => t.toLowerCase()) };
  }
  return query;
}

async function createBookmark(req, res) {
  const { title, url, description, tags, favorite } = req.body || {};

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "url must be a valid http(s) URL" });
  }

  let resolvedTitle = title && String(title).trim();
  if (!resolvedTitle) {
    resolvedTitle = await fetchTitle(url);
  }

  const bookmark = await Bookmark.create({
    title: resolvedTitle || "",
    url,
    description: description || "",
    tags: parseTags(tags),
    favorite: Boolean(favorite)
  });

  return res.status(201).json(bookmark);
}

async function listBookmarks(req, res) {
  const { q, tags } = req.query;
  const tagList = parseTags(tags);
  const query = buildQuery(q, tagList);

  const bookmarks = await Bookmark.find(query).sort({ updatedAt: -1 });
  return res.json(bookmarks);
}

async function getBookmark(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const bookmark = await Bookmark.findById(id);
  if (!bookmark) return res.status(404).json({ error: "Not found" });
  return res.json(bookmark);
}

async function updateBookmark(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const { title, url, description, tags, favorite } = req.body || {};

  if (url !== undefined && !isValidUrl(url)) {
    return res.status(400).json({ error: "url must be a valid http(s) URL" });
  }
  if (title !== undefined && !String(title).trim()) {
    return res.status(400).json({ error: "title cannot be empty" });
  }

  const updated = await Bookmark.findByIdAndUpdate(
    id,
    {
      ...(title !== undefined ? { title } : {}),
      ...(url !== undefined ? { url } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(tags !== undefined ? { tags: parseTags(tags) } : {}),
      ...(favorite !== undefined ? { favorite: Boolean(favorite) } : {})
    },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Not found" });
  return res.json(updated);
}

async function deleteBookmark(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const deleted = await Bookmark.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  return res.status(204).send();
}

module.exports = {
  createBookmark,
  listBookmarks,
  getBookmark,
  updateBookmark,
  deleteBookmark
};
