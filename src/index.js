import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MenuProvider from "./context/MenuProvider";
import UserProvider from "./context/UserProvider";
import PedidosProvider from "./context/PedidosProvider";

ReactDOM.render(
  <UserProvider>
    <PedidosProvider>
      <MenuProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MenuProvider>
    </PedidosProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
