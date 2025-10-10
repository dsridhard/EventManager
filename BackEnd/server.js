import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import ContactRoutes from "./routes/contact.routes.js";
import UserRoutes from "./routes/user.routes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", ContactRoutes)
app.use("/api/User", UserRoutes)
app.get("/", (req, res) => res.send("API Running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));