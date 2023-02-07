import React from "react";
import Design from "./pages/Design";
import Home from "./pages/Home";
import HomeMap from "./pages/HomeMap";
import Equipment from "./pages/Equipment";
import Gnb from "./components/gnb";
import Fotter from "./components/fotter";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ContactForm from "./pages/Contact";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Gnb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={<Design />} />
          <Route path="/map" element={<HomeMap />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
        <Fotter />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;