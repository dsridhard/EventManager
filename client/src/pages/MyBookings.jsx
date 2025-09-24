import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/bookings/my", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBookings(res.data));
  }, []);

  return (
    <div>
      <Typography variant={"h4"} marginTop={8}>My Bookings</Typography>
      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.event?.title} on {b.event?.date?.slice(0, 10)}
          </li>
        ))}
      </ul>
    </div>
  );
}