import React from 'react';
import IconMenu from './IconMenu';

function App() {
  return (
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
    minHeight: "30vh", // keeps it tall enough
  }}
>
  <h1
    style={{
      fontSize: "clamp(1.5rem, 5vw, 3rem)", // responsive font size
      fontWeight: "bold",
      color: "#1D4ED8",
    }}
  >
    Welcome to the Hotel Management System
  </h1>
</div>
  );
}

export default App;