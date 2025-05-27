import { logout } from "../utils/auth";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-red-600 text-white px-6 py-3 flex space-x-6 items-center">
      <div style={{
        display: "flex",
        flexWrap: "wrap",                // allow wrapping if screen is small
        justifyContent: "center",        // center the entire group
        gap: "20px",                     // consistent spacing
        padding: "20px",
        backgroundColor: "red",
        borderRadius: "8px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}>
        <Link to="/" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Home</Link>
        <Link to="/guests" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Guests</Link>
        <Link to="/rooms" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Rooms</Link>
        <Link to="/bookings" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Bookings</Link>
        <Link to="/payments" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Payments</Link>
        <Link to="/services" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Services</Link>
        <Link to="/staff" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Staff</Link>
        <Link to="/guestservices" style={{ padding: '8px', border: '1px solid white', borderRadius: '4px' }}>Guest Services</Link>
      </div>
      <button onClick={logout} className="ml-4 hover:underline text-white font-semibold">
        Logout
      </button>
    </nav>

  );
}