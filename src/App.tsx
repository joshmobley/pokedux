import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Players from "./features/players/Players";
import { BLUE } from "./colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guess from "./features/guess/Guess";
import Scores from "./features/scores/Scores";

function App() {
  return (
    <div style={{ background: BLUE, minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Players />} />
          <Route path="guess" element={<Guess />} />
          <Route path="scores" element={<Scores />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
