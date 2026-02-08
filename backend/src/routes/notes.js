const express = require("express");
const router = express.Router();
const controller = require("../controllers/notesController");

router.post("/", controller.createNote);
router.get("/", controller.listNotes);
router.get("/:id", controller.getNote);
router.put("/:id", controller.updateNote);
router.delete("/:id", controller.deleteNote);

module.exports = router;
