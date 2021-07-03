import React, { useContext, useEffect, useState, useRef } from "react";
import { formatISO9075 } from "date-fns";
import { MenuContext } from "../../../context/MenuProvider";
import { PedidosContext } from "../../../context/PedidosProvider";
import MenuAvailableList from "./MenuAvailableList";
import "./menuAvailable.css";
import "aos/dist/aos.css";
const MenuAvailable = () => {
  const { availableMenu, handleGetAllAvailableMenu } = useContext(MenuContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jornada, setJornada] = useState("");
  const [disabledButtom, setDisabledButtom] = useState(true);

  const { order, setOrder, handleAddOrder } = useContext(PedidosContext);
  useEffect(() => {
    handleGetAllAvailableMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let time = useRef();
  // formatISO9075(new Date());
  const [schedule, setSchedule] = useState(time);

  /* ++++++++++++++++++++COMPONENT STATES+++++++++++++++++++++++++++++++++++++ */

  useEffect(() => {
    let unmunted = false;
    const updateTime = () => {
      time.current = formatISO9075(new Date());

      if (!unmunted) {
        setSchedule(time.current);
      }
    };

    setInterval(updateTime, 1000);
    return () => {
      unmunted = true;
    };
  }, []);

  const handleShowConfirmOrder = (
    e,
    setShowConfirm,
    setJornada,
    dataMenu,
    user,
    setOrder
  ) => {
    const now = new Date();
    const date = formatISO9075(now, { representation: "date" });
    const time = formatISO9075(now, { representation: "time" });
    setShowConfirm(true);
    setJornada(e.target.value);

    let dataOrder = {
      sede: null,
      menuId: dataMenu.menuId,
      price: dataMenu.price.replace(".", ""),
      menuName: dataMenu.menuName,
      jornada: e.target.value,
      date: date,
      time: time,
      idEmployed: user.nit,
      employedName: user.name,
      entity: user.entity,
    };
    setOrder(dataOrder);

    console.log(dataOrder);
  };

  const handleCloseConfirmOrder = () => {
    setDisabledButtom(true);
    setShowConfirm(false);
    setJornada("");
    setOrder(null);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    handleAddOrder();
    setShowConfirm(false);
    setDisabledButtom(true);
    console.log(order);
  };

  const handleChangeSedeInOrder = (e) => {
    setOrder({ ...order, sede: e.target.value });
    setDisabledButtom(false);
    console.log(order);
  };

  return (
    <div className="menu-container">
      <div className="alert alert-info text-center">
        {`Pedidos validos solo para el mismo día: ${schedule}`}
      </div>

      <div className="menu-box-container mt-3">
        {availableMenu.map((item) => (
          <MenuAvailableList
            key={item.uid}
            item={item}
            setShowConfirm={setShowConfirm}
            handleCloseConfirmOrder={handleCloseConfirmOrder}
            handleShowConfirmOrder={handleShowConfirmOrder}
            setJornada={setJornada}
            jornada={jornada}
          />
        ))}
      </div>

      {showConfirm && (
        <div data-aos="zoom-in-up" className="solicit-container">
          <form className="solicit-form-box">
            <h1>Confirmación de su pedido</h1>

            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleChangeSedeInOrder(e)}
            >
              <option value="DEFAULT" disabled>
                -Seleccione la sede de su pedido-
              </option>
              <option value="VIVA_ASISTENCIA">VIVA ASISTENCIA</option>
              <option value="VIVA_ADMINISTRATIVO">VIVA ADMINISTRATIVO</option>
              <option value="FOCA_NORTE">FOCA NORTE</option>
              <option value="SALA_AZUL">SALA AZUL</option>
              <option value="EGLE">EGLE</option>
              <option value="51B_PISO_1">51B PISO 1</option>
              <option value="51B_PISO_2">51B PISO 2</option>
              <option value="LOCAL4">LOCAL 4</option>
              <option value="FARMACIA">FARMACIA</option>
              <option value="CIRUGIA">CIRUGIA</option>
            </select>
            <div className="solicit-btns-box">
              <button
                className="btn btn-success"
                onClick={(e) => handleConfirmOrder(e)}
                disabled={disabledButtom}
              >
                CONFIRMAR
              </button>
              <button
                className="btn btn-danger"
                onClick={handleCloseConfirmOrder}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenuAvailable;
