import React from "react";
import Design from "./pages/Design";
import Home from "./pages/Home";
import HomeMap from "./pages/HomeMap";
import Equipment from "./pages/Equipment";
import Gnb from "./components/gnb";
import Fotter from "./components/fotter";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ContactForm from "./pages/Contact";
import View from "./components/community/View";
import Write from "./components/community/Write";
import Community from "./pages/Community";
import ReWrite from "./components/community/ReWrite";

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
          <Route path="/community" element={<Community itemsPerPage={4} />} />
          <Route path="/view" element={<View />} />
          <Route path="/write" element={<Write />} />
          <Route path="/rewrite" element={<ReWrite />} />
        </Routes>
        <Fotter />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
