import express from "express";
import Event from "../models/event.model.js";
import { auth, role } from "../middleware/auth.js";

const router = express.Router();

// Public: List events
router.get("/", async (req, res) => {
  const events = await Event.find().populate("organizer", "name email");
  res.json(events);
});

// Organizer/Admin: Create event
router.post("/", auth, role(["organizer", "admin"]), async (req, res) => {
  const event = await Event.create({ ...req.body, organizer: req.user._id });
  res.json(event);
});

// Organizer/Admin: Update event
router.put("/:id", auth, role(["organizer", "admin"]), async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

// Admin: Delete event
router.delete("/:id", auth, role(["admin"]), async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ msg: "Event deleted" });
});

export default router;