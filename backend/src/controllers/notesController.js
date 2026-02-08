const Note = require("../models/Note");
const { parseTags, isValidObjectId } = require("../utils/validators");

function buildQuery(q, tags) {
  const query = {};
  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [{ title: regex }, { content: regex }, { tags: regex }];
  }
  if (tags && tags.length > 0) {
    query.tags = { $all: tags.map((t) => t.toLowerCase()) };
  }
  return query;
}

async function createNote(req, res) {
  const { title, content, tags, favorite } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const note = await Note.create({
    title,
    content,
    tags: parseTags(tags),
    favorite: Boolean(favorite)
  });

  return res.status(201).json(note);
}

async function listNotes(req, res) {
  const { q, tags } = req.query;
  const tagList = parseTags(tags);
  const query = buildQuery(q, tagList);

  const notes = await Note.find(query).sort({ updatedAt: -1 });
  return res.json(notes);
}

async function getNote(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const note = await Note.findById(id);
  if (!note) return res.status(404).json({ error: "Not found" });
  return res.json(note);
}

async function updateNote(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const { title, content, tags, favorite } = req.body || {};
  if (title !== undefined && !title) {
    return res.status(400).json({ error: "title cannot be empty" });
  }
  if (content !== undefined && !content) {
    return res.status(400).json({ error: "content cannot be empty" });
  }

  const updated = await Note.findByIdAndUpdate(
    id,
    {
      ...(title !== undefined ? { title } : {}),
      ...(content !== undefined ? { content } : {}),
      ...(tags !== undefined ? { tags: parseTags(tags) } : {}),
      ...(favorite !== undefined ? { favorite: Boolean(favorite) } : {})
    },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Not found" });
  return res.json(updated);
}

async function deleteNote(req, res) {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const deleted = await Note.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  return res.status(204).send();
}

module.exports = {
  createNote,
  listNotes,
  getNote,
  updateNote,
  deleteNote
};
