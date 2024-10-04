import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/main-page/App";
import Header from "./components/header/header";
import EditPage from "./pages/edit-page/epage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Используй BrowserRouter вместо Router
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/edit/:userId" element={<EditPage />} />
        </Routes>
      </Router>
    </Provider>
  </div>
);
