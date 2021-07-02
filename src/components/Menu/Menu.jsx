import React, { useContext, useEffect } from "react";
import AddMenu from "../formAddMenu/AddMenu";
import MenuList from "../MenuList/MenuList";
import Swal from "sweetalert2";
import "./menu.css";
import "aos/dist/aos.css";

import { MenuContext } from "../../context/MenuProvider";

const Menu = () => {
  /*+++++++++++++++++++++++++++++++++++++ STATE CONTEXT ++++++++++++++++++++++++++++++++++ */
  const {
    setUidd,

    menu,
    deleteSelectedMenu,
    setImageUrl,
    setPrice,
    setTitle,
    setDescription,
    edit,
    setEdit,
    showAddMenu,
    setShowAddMenu,
    handleGetAllMenu,
  } = useContext(MenuContext);

  /*+++++++++++++++++++++++++++++++STATE COMPONENT++++++++++++++++++++ */

  /**+++++++++++++++++FUNCTION COMPONENTS ++++++++++++++++++++ */
  useEffect(() => {
    handleGetAllMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwalDeleteMenu = (id) => {
    console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar este menu?",
      text: "No se podra revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedMenu(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleEdit = (item) => {
    const newPrice = item.price.replace(".", "");
    setEdit(true);
    setUidd(item.uid);
    setImageUrl(item.source_img);
    setPrice(newPrice);
    setDescription(item.description);
    setTitle(item.title);
    console.log(item.uid);
  };

  const handleShowAddMEnu = () => {
    setEdit(false);
    setShowAddMenu(true);
    setImageUrl(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setUidd(null);
  };
  return (
    <div className="menu-container">
      <button className="btn btn-primary" onClick={() => handleShowAddMEnu()}>
        Agregar nuevo menú
      </button>
      <div className="menu-box-container mt-3">
        {menu.map((item) => (
          <MenuList
            key={item.title}
            item={item}
            handleSwalDeleteMenu={handleSwalDeleteMenu}
            handleEdit={handleEdit}
          />
        ))}
      </div>
      {showAddMenu || edit ? (
        <AddMenu
          setShowAddMenu={setShowAddMenu}
          edit={edit}
          setEdit={setEdit}
        />
      ) : null}
    </div>
  );
};

export default Menu;
