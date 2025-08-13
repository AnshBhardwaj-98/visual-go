import { useState } from "react";
import AlgoVisualizer from "./components/AlgoVisualizer.components";
import Navbar from "./components/Navbar.components";

function App() {
  return (
    <>
      <Navbar />
      <AlgoVisualizer></AlgoVisualizer>
    </>
  );
}

export default App;
