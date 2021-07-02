import React, { useContext } from "react";

import "./MenuList.css";

import { MenuContext } from "../../context/MenuProvider";
import ButtonUpdateAvailable from "./ButtonUpdateAvailable";
import ButtonEdit from "./ButtonEdit";
import ButtonDelete from "./ButtonDelete";

const MenuList = ({ item, handleEdit, handleSwalDeleteMenu }) => {
  const { handleUpdateAvailable } = useContext(MenuContext);

  return (
    <div
      className="card-menu"
      style={{
        background: item.available === 0 ? "rgba(128, 128, 128, 0.8)" : null,
      }}
    >
      <ButtonUpdateAvailable
        handleUpdateAvailable={handleUpdateAvailable}
        item={item}
      />
      <img
        src={item.source_img}
        alt="imagenn_del_menu"
        className={item.available === 0 ? "disabled" : null}
      />
      <div
        className={
          item.available === 0 ? "card-menu-right disabled" : "card-menu-right"
        }
      >
        <div className="card-menu-header">
          <h5>{item.title}</h5>
          <p className="menu-description">{item.description}</p>
        </div>

        <div className="card-menu-footer">
          <h4> {`$ ${item.price}`}</h4>
          <div className="btns-options">
            <ButtonEdit handleEdit={handleEdit} item={item} />

            <ButtonDelete
              handleSwalDeleteMenu={handleSwalDeleteMenu}
              item={item}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
