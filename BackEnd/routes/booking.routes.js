import express from "express";
import Booking from "../models/booking.model.js";
import Event from "../models/event.model.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// User: Book event
router.post("/:eventId", auth, async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ msg: "Event not found" });
  if (event.attendees.length >= event.capacity)
    return res.status(400).json({ msg: "Event is full" });
  const booking = await Booking.create({ user: req.user._id, event: event._id });
  event.attendees.push(req.user._id);
  await event.save();
  res.json(booking);
});

// User: My bookings
router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("event");
  res.json(bookings);
});

export default router;