const express = require("express");
const router = express.Router();

let items = [];
let idCounter = 1;

// Alle Items abrufen
router.get("/", (req, res) => {
  res.status(200).json(items);
});

// Neues Item erstellen
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const newItem = { id: idCounter++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Einzelnes Item abrufen
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  res.status(200).json(item);
});

// Item löschen
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter((i) => i.id !== id);
  res.status(204).send();
});

module.exports = router;
