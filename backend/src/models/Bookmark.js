const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    url: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    favorite: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
