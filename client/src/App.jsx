import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Event";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/NavBar";
import Speakers from "./pages/Speakers";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin"
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/speakers" element={<Speakers />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/admin" element={<Admin />}></Route>

      </Routes>
    </div>
  );
}
