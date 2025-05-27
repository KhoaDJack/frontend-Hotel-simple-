import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/auth";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GuestsPage from "./pages/GuestsPage";
import RoomsPage from "./pages/RoomsPage";
import BookingsPage from "./pages/BookingsPage";
import PaymentsPage from "./pages/PaymentsPage";
import ServicesPage from "./pages/ServicesPage";
import StaffPage from "./pages/StaffPage";
import GuestServicesPage from "./pages/GuestServicesPage";
import NavBar from "./components/NavBar";

function App() {
  const loggedIn = isLoggedIn();

  return (
    <Router>
      {loggedIn && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {loggedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/guests" element={<GuestsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/guestservices" element={<GuestServicesPage />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;