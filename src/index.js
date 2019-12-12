import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Home from "./pages/home";

function App() {
  return <Home />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
