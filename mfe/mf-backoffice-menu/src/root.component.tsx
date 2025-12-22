import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./global-font.css";
import MenuApp from "./pages/menuApp/MenuApp";

export default function Root() {
  return (
    <BrowserRouter>
      <MenuApp />
    </BrowserRouter>
  );
}
