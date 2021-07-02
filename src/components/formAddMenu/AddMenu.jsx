import React, { useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import "./addMenu.css";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/dist/v4";
import { MenuContext } from "../../context/MenuProvider";
//FIREBASE STORAGE
import { storage } from "../../firebase";

const AddMenu = ({ setShowAddMenu, edit, setEdit }) => {
  /**********************Context*************************************/
  const {
    loading,
    setLoading,
    menu,
    setMenu,
    imgUrl,
    setImageUrl,
    price,
    setPrice,
    title,
    setTitle,
    description,
    setDescription,
    handleUpdateSelected,
    uidd,
    setUidd,
  } = useContext(MenuContext);

  /**********************Context*************************************/

  const [enabled, setEnabled] = useState(false);

  const addImgStorage = async (image, title) => {
    try {
      const imageRef = storage.ref().child("snacks-images").child(title);
      await imageRef.put(image);
      const imageURL = await imageRef.getDownloadURL();
      console.log(imageURL);
      setImageUrl(imageURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetImage = (e) => {
    setLoading(true);
    console.log(e.target.files[0]);
    const imageFile = e.target.files[0];
    if (imageFile) {
      if (
        imageFile.type === "image/jpeg" ||
        imageFile.type === "image/jpg" ||
        imageFile.type === "image/png"
      ) {
        console.log(imageFile.type);
        addImgStorage(imageFile, imageFile.name);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    const handleEnabledButton = () => {
      if (
        imgUrl === null ||
        !title.trim() ||
        !description.trim() ||
        !price.trim()
      ) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    };
    handleEnabledButton();
  }, [imgUrl, price, description, title]);

  /*---------------------------------POST HANDLE -----------------------------------------*/

  const handleInsertNewSnack = async (e) => {
    e.preventDefault();
    const uid = uuid();

    try {
      axios.post("http://localhost:3001/api/addMenu", {
        price: price,
        description: description,
        title: title,
        source_img: imgUrl,
        uid: uid,
      });

      setMenu([
        ...menu,
        {
          available: 1,
          price: new Intl.NumberFormat("de-DE").format(price),
          description: description,
          title: title,
          source_img: imgUrl,
          uid: uid,
        },
      ]);
      setTimeout(() => {
        setShowAddMenu(false);
      }, 3000);
      setImageUrl(null);
      setPrice("");
      setTitle("");
      setDescription("");
      toast.success(`Menu: ${title} creado con exito!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const closeAddMenu = () => {
    setEdit(false);
    setShowAddMenu(false);
    setImageUrl(null);
    setPrice("");
    setDescription("");
    setTitle("");
    setUidd(null);
  };
  return (
    <div className="addMenuContainer" data-aos="zoom-in-up">
      {/* <Link className="btn btn-primary btn-go-back" to="/">
        Menu
      </Link> */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className="formMenu-container">
        <button className="btn-closed" onClick={closeAddMenu}>
          X
        </button>
        {imgUrl && <img className="img-menu" src={imgUrl} alt="img"></img>}
        <input
          type="file"
          className="input-file"
          id="source-input-img"
          onChange={(e) => handleSetImage(e)}
        />
        <label
          className={
            loading ? " btn btn-secondary disabled" : "btn btn-secondary"
          }
          htmlFor="source-input-img"
        >
          Añadir imagen
        </label>
        <div className="container-atributes">
          <input
            value={price}
            type="number"
            placeholder="precio..."
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            value={title}
            type="text"
            placeholder="titulo..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            placeholder="descripcion..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {edit ? (
          <button
            className="btn btn-warning"
            disabled={enabled}
            onClick={(e) => handleUpdateSelected(e, uidd)}
          >
            Editar
          </button>
        ) : (
          <button
            className="btn btn-primary"
            disabled={enabled}
            onClick={(e) => handleInsertNewSnack(e)}
          >
            Añadir
          </button>
        )}
      </form>
    </div>
  );
};

export default AddMenu;
