import React from "react";

const ButtonDelete = ({ handleSwalDeleteMenu, item }) => {
  return (
    <button
      className="btn btn-danger btns-opt"
      onClick={() => handleSwalDeleteMenu(item.uid)}
    >
      Eliminar
    </button>
  );
};

export default ButtonDelete;
