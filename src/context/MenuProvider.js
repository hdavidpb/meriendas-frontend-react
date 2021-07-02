import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
export const MenuContext = createContext();

const MenuProvider = (props) => {
  const [menu, setMenu] = useState([]);
  const [availableMenu, setAvailableMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uidd, setUidd] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  /**++++++++++++++++++++++++ FUNCTION GET ALL MENU FROM THE TABLE MENU ++++++++++++++++++++++++++++++++++++ */
  const handleGetAllMenu = async () => {
    try {
      const menuList = await axios.get("http://localhost:3001/api/getAllMenu");
      const dataMenu = menuList.data;

      let newArray = [];
      dataMenu.forEach((el) => {
        newArray.push({
          ...el,
          price: new Intl.NumberFormat("de-DE").format(el.price),
        });
      });
      setMenu(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  /**++++++++++++++++++++++++FUNCTION GET ALL MENU_AVAILABLE FROM THE TABLE MENU ++++++++++++++++++++++++++++++++++++ */

  const handleGetAllAvailableMenu = async () => {
    try {
      const availableMenuData = await axios.get(
        "http://localhost:3001/api//get-all-menu-available"
      );

      const allAvailableMenu = availableMenuData.data;
      let formatMenuAvailable = [];
      allAvailableMenu.forEach((el) => {
        formatMenuAvailable.push({
          ...el,
          price: new Intl.NumberFormat("de-DE").format(el.price),
        });
      });
      setAvailableMenu(formatMenuAvailable);
      console.log(formatMenuAvailable);
    } catch (error) {
      console.log(error);
    }
  };

  /**++++++++++++++++++++++++CALLING GET ALL MENU IN USEEFECT ++++++++++++++++++++++++++++++++++++ */
  useEffect(() => {
    handleGetAllMenu();
  }, []);

  /**++++++++++++++++++++++++ FUNCTION UPDATE AVAILABLE MENU FROM THE TABLE MENU ++++++++++++++++++++++++++++++++++++ */

  const handleUpdateAvailable = async (item) => {
    try {
      axios.put(`http://localhost:3001/api/updateAvailable/${item.id}`, {
        available: item.available,
      });
      const change = item.available === 0 ? 1 : 0;
      const menuUpdate = menu.map((el) =>
        el.id === item.id ? { ...item, available: change } : el
      );
      console.log(menuUpdate);
      setMenu(menuUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  /**++++++++++++++++++++++++FUNCTION DELETE MENU FROM THE TABLE MENU ++++++++++++++++++++++++++++++++++++ */
  const deleteSelectedMenu = async (id) => {
    try {
      axios.delete(`http://localhost:3001/api/deleteMenu/${id}`);
      const newMenu = menu.filter((el) => el.uid !== id);
      setMenu(newMenu);
    } catch (error) {
      console.log(error);
    }
  };

  /**++++++++++++++++++++++++FUNCTION UPDATE SELECTED MENU FROM THE TABLE MENU ++++++++++++++++++++++++++++++++++++ */
  const handleUpdateSelected = async (e, uid) => {
    console.log(uid);
    e.preventDefault();
    try {
      axios.put(`http://localhost:3001/api/updateMenuSelected/${uid}`, {
        source_img: imgUrl,
        price: price,
        title: title,
        description: description,
      });
      Swal.fire("Menu actualizado!", "", "success");
      const newArray = menu.map((el) =>
        el.uid === uid
          ? {
              ...el,
              source_img: imgUrl,
              price: new Intl.NumberFormat().format(price),
              title: title,
              description: description,
            }
          : el
      );
      setMenu(newArray);
      setEdit(false);
      setShowAddMenu(false);
      setUidd(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        showAddMenu,
        setShowAddMenu,
        edit,
        setEdit,

        uidd,
        setUidd,
        imgUrl,
        setImageUrl,
        price,
        setPrice,
        title,
        setTitle,
        description,
        setDescription,
        menu,
        availableMenu,
        setMenu,
        loading,
        setLoading,
        handleGetAllMenu,
        handleGetAllAvailableMenu,
        handleUpdateAvailable,
        deleteSelectedMenu,
        handleUpdateSelected,
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
export default MenuProvider;
