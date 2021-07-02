import React from "react";

const ButtonEdit = ({ handleEdit, item }) => {
  return (
    <button
      className="btn btn-warning btns-opt"
      onClick={() => handleEdit(item)}
    >
      Editar
    </button>
  );
};

export default ButtonEdit;
