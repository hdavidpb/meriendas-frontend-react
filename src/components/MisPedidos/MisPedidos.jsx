import React, { useContext } from "react";
import "./misPedidos.css";
import report from "../../assets/img/report.svg";
import { PedidosContext } from "../../context/PedidosProvider";
import { UserContext } from "../../context/UserProvider";
const MisPedidos = () => {
  const {
    initialDate,
    setInitialDate,
    finalDate,
    setFinalDate,
    handleGetOrdersByDate,
    ordersByDate,
  } = useContext(PedidosContext);
  const { user } = useContext(UserContext);

  const handleChageInitialDate = (e) => {
    setInitialDate(e.target.value);
    console.log(e.target.value);
  };

  const handleChageFinalDate = (e) => {
    setFinalDate(e.target.value);
    console.log(finalDate);
  };

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
          </ul>
        ))}
      </div>
      <div className="total-orders mb-3">
        <h4>Total: </h4>
        <h5>{`$ ${new Intl.NumberFormat("de-DE").format(
          ordersByDate.reduce((ttl, el) => ttl + el.precio, 0)
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
