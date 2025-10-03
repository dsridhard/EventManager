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
  res.json({ "message": "Booked Succesfully", booking });
});

// User: My bookings
router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("event");
  res.json(bookings);
});



// Organizer/Admin: Update event
// router.put("/:eventId", auth, async (req, res) => {
//   const Event = await Event.D(req.params.eventId);
//   res.json({ "message": "Booking Updated Successfully" })
// })


router.delete("/:bookingId", auth, async (req, res) => {
  try {
    const deletedEvent = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Booking Cancelled Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Speaker routes
router.get("/speaker", async (req, res) => {
  const speakers = await Event.find().select('speaker');
  res.json({ "msg": "Success", speakers })
})

export default router;