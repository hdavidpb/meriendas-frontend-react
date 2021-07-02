import React from "react";

const ButtonUpdateAvailable = ({ item, handleUpdateAvailable }) => {
  return (
    <button
      className={item.available === 1 ? "disabled-check" : "available-check"}
      onClick={() => handleUpdateAvailable(item)}
    >
      {item.available === 1 ? "Deshabilitar" : "Habilitar"}
    </button>
  );
};

export default ButtonUpdateAvailable;
