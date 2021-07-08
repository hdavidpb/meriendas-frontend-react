import React from "react";
import "./entregar.css";
import "../MisPedidos/misPedidos.css";
const EntregarList = ({ item, index, handleCheckedOrder, filterOrder }) => {
  return (
    <ul key={item.id} className="orders-list">
      <li className="order-list-item counter">{index + 1}</li>
      <li className="order-list-item ckeckboxBox">
        {item.estado === "pendiente" && (
          <input
            type="checkbox"
            id="check"
            checked={item.check}
            onChange={() => handleCheckedOrder(item, index)}
          />
        )}
        <div
          className={
            item.estado === "entregado"
              ? "state-mark delivered"
              : "state-mark pending "
          }
        ></div>
      </li>
      <li
        className={
          item.check
            ? "order-list-item state selected-item "
            : "order-list-item state"
        }
      >
        <div>{item.estado}</div>
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >
        {item.entidad}
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >
        {item.sede}
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >
        {item.nombre_empleado}
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >
        {item.fecha.slice(0, 10)}
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >
        {item.jornada === 1 ? "MAÑANA" : "TARDE"}
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >
        {item.nombre_menu}
      </li>
      <li
        className={
          item.check ? "order-list-item selected-item " : "order-list-item"
        }
      >{`$ ${new Intl.NumberFormat("de-DE").format(item.precio)}`}</li>
    </ul>
  );
};

export default EntregarList;
