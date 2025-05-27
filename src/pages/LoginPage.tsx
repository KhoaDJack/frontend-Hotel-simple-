import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      localStorage.setItem("loggedIn", "true");
      window.location.href = "/";
    } else {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Hotel Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}