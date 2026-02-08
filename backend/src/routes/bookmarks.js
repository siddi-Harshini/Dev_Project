const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookmarksController");

router.post("/", controller.createBookmark);
router.get("/", controller.listBookmarks);
router.get("/:id", controller.getBookmark);
router.put("/:id", controller.updateBookmark);
router.delete("/:id", controller.deleteBookmark);

module.exports = router;
