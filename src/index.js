import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TeamProvider from "./context/TeamContext.js";
import AuctionProvider from "./context/AuctionContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TeamProvider>
    <AuctionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuctionProvider>
  </TeamProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
