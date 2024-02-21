import React from "react";
import MainPage from "./pages/mainPage";
import DetailPage from "./pages/detailPage";
import CreatePage from "./pages/createPage";
import Header from './components/header'
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
