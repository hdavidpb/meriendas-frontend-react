import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../context/UserProvider";
import { PedidosContext } from "../../../context/PedidosProvider";

const MenuAvailableList = ({
  item,
  handleCloseConfirmOrder,
  handleShowConfirmOrder,
  setJornada,
  setShowConfirm,
}) => {
  /***************************+CONTEXT STATES***********************************/
  const { user } = useContext(UserContext);
  const { setOrder } = useContext(PedidosContext);
  /***************************+CONTEXT STATES***********************************/

  const dataMenu = {
    menuId: item.uid,
    price: item.price,
    menuName: item.title,
  };

  /* ++++++++++++++++++++COMPONENT STATES+++++++++++++++++++++++++++++++++++++ */

  let hour = new Date().getHours();
  let day = new Date().getDay();

  const [hours, setHours] = useState(hour);
  const [days, setDays] = useState(day);
  const [showJornada1, setShowJornada1] = useState(false);
  const [showJornada2, setShowJornada2] = useState(false);

  useEffect(() => {
    const updateHourAndDay = () => {
      let unmunted = false;
      let hour = new Date().getHours();
      let day = new Date().getDay();
      if (!unmunted) {
        setHours(hour);
        setDays(day);
      }

      setInterval(updateHourAndDay, 1000);
      return () => {
        unmunted = true;
      };
    };
  }, []);

  useEffect(() => {
    const detectedJornada = () => {
      if (hours >= 5 && hours < 9 && days !== 7) {
        setShowJornada1(true);
      } else {
        setShowJornada1(false);
      }

      if (hours >= 5 && hours < 16 && days < 6) {
        setShowJornada2(true);
      } else {
        setShowJornada2(false);
      }
    };
    detectedJornada();
  }, [hours, days]);

  return (
    <div className="card-menu">
      <img
        src={item.source_img}
        alt="imagenn_del_menu"
        className={item.available === 0 ? "disabled" : null}
      />
      <div className="card-menu-right">
        <div className="card-menu-header">
          <h5>{item.title}</h5>
          <p className="menu-description">{item.description}</p>
        </div>

        <div className="card-menu-footer">
          <h4> {`$ ${item.price}`}</h4>
          <div className="btns-options ">
            {showJornada1 ? (
              <button
                value="1"
                className="btn btn-info order"
                onClick={(e) =>
                  handleShowConfirmOrder(
                    e,

                    setShowConfirm,
                    setJornada,
                    dataMenu,
                    user,
                    setOrder
                  )
                }
              >
                Mañana (10 AM)
              </button>
            ) : null}
            {showJornada2 ? (
              <button
                value="2"
                className="btn btn-info order"
                onClick={(e) =>
                  handleShowConfirmOrder(
                    e,

                    setShowConfirm,
                    setJornada,
                    dataMenu,
                    user,
                    setOrder
                  )
                }
              >
                Tarde(5 PM)
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAvailableList;
