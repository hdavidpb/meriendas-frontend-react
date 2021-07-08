import React, { useContext, useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import "./misPedidos.css";
import Swal from "sweetalert2";
import report from "../../assets/img/report.svg";
import { PedidosContext } from "../../context/PedidosProvider";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
const MisPedidos = () => {
  const actualHour = new Date().getHours();

  const [hour, setHour] = useState(actualHour);

  const {
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
    handleGetOrdersByDate,
    ordersByDate,

    schedule,
  } = useContext(PedidosContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setHour(new Date().getHours());
  }, [schedule, setHour]);

  const AnularOrderAction = async (item) => {
    const actualDate = formatISO9075(new Date(), { representation: "date" });

    const hour = new Date().getHours();
    console.log(`JORNADA : ${item.jornada} #HORA : ${hour}`);
    if (item.jornada === 1 && hour >= 9) {
      Swal.fire("Ya no puede anular la orden ", "", "danger");
      return;
    }
    if (item.jornada === 2 && hour >= 16) {
      Swal.fire("Ya no puede anular la orden ", "", "danger");
      return;
    }

    if (actualDate === schedule) {
      try {
        await axios.put(
          `http://localhost:3001/api/updateTo-delivered-anular/${item.id}`,
          {
            state: "anulado",
          }
        );
        Swal.fire("Orden anulada!", "", "success");
      } catch (error) {
        console.log(error);
      }
      handleGetOrdersByDate(initialDate, finalDate, user.nit);
    } else {
      Swal.fire("Ya no puede anular la orden ", "", "danger");
    }
  };

  const handleChageInitialDate = (e) => {
    setInitialDate(e.target.value);
    console.log(e.target.value);
  };

  const handleChageFinalDate = (e) => {
    setFinalDate(e.target.value);
    console.log(finalDate);
  };

  useEffect(() => {
    handleGetOrdersByDate(initialDate, finalDate, user.nit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mis-pedidos-container mt-3">
      <h2 className="text-center ">Tus pedidos</h2>
      <div className="date-container">
        <div className="date-container-inputDate">
          <input
            value={initialDate}
            type="date"
            onChange={(e) => handleChageInitialDate(e)}
          />
          <input
            value={finalDate}
            type="date"
            onChange={(e) => handleChageFinalDate(e)}
          />
        </div>

        <button
          className="btn btn-success btn-search"
          onClick={() =>
            handleGetOrdersByDate(initialDate, finalDate, user.nit)
          }
        >
          BUSCAR PEDIDOS
        </button>
      </div>
      <ul className="orders-list header">
        <li className="order-list-item"> ESTADO</li>
        <li className="order-list-item"> FECHA</li>
        <li className="order-list-item"> JORNADA</li>
        <li className="order-list-item"> MENÚ</li>
        <li className="order-list-item"> PRECIO</li>
        <li className="order-list-item"> </li>
      </ul>

      <div className="orders-container ">
        {ordersByDate.map((item) => (
          <ul key={item.id} className="orders-list">
            <li className="order-list-item state">
              <div
                className={
                  item.estado === "entregado"
                    ? "state-mark delivered"
                    : "state-mark pending "
                }
              ></div>
              <div>{item.estado}</div>
            </li>
            <li className="order-list-item">{item.fecha}</li>
            <li className="order-list-item">
              {item.jornada === 1 ? "MAÑANA" : "TARDE"}
            </li>
            <li className="order-list-item">{item.nombre_menu}</li>
            <li className="order-list-item">{`$ ${new Intl.NumberFormat(
              "de-DE"
            ).format(item.precio)}`}</li>
            {item.jornada === 1 &&
            item.fecha &&
            item.estado === "pendiente" &&
            schedule &&
            hour < 9 ? (
              <li className="order-list-item">
                <button
                  className="btn btn-danger"
                  onClick={() => AnularOrderAction(item)}
                >
                  ANULAR
                </button>
              </li>
            ) : null}
            {item.jornada === 2 &&
            item.estado !== "anulado" &&
            item.fecha === schedule &&
            hour < 16 ? (
              <li className="order-list-item">
                <button
                  className="btn btn-danger"
                  onClick={() => AnularOrderAction(item)}
                >
                  ANULAR
                </button>
              </li>
            ) : null}
          </ul>
        ))}
      </div>
      <div className="total-orders mb-3">
        <h4>Total: </h4>
        <h5>{`$ ${new Intl.NumberFormat("de-DE").format(
          ordersByDate.reduce(
            (ttl, el) =>
              (el.estado === "pendiente" || el.estado === "entregado") &&
              ttl + el.precio,
            0
          )
        )}`}</h5>
      </div>
      {ordersByDate.length === 0 && (
        <img src={report} alt="" className="orders-img" />
      )}
    </div>
  );
};
// new Intl.NumberFormat("de-DE").format(ordersByDate.reduce((ttl, el) => ttl + el.precio, 0))
export default MisPedidos;
