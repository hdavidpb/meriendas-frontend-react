import React, { createContext, useState, useEffect, useRef } from "react";

import { formatISO9075 } from "date-fns";
import Swal from "sweetalert2";

import axios from "axios";
export const PedidosContext = createContext();

const PedidosProvider = (props) => {
  const date = formatISO9075(new Date(), { representation: "date" });

  const [order, setOrder] = useState(null);
  const [initialDate, setInitialDate] = useState(date);
  const [finalDate, setFinalDate] = useState(date);
  const [ordersByDate, setOrdersByDate] = useState([]);

  let time = useRef();
  const actualDate = formatISO9075(new Date());

  // formatISO9075(new Date());
  const [schedule, setSchedule] = useState(actualDate);

  useEffect(() => {
    let unmunted = false;
    const updateTime = () => {
      time.current = formatISO9075(new Date(), { representation: "date" });

      if (!unmunted) {
        setSchedule(time.current);
      }
    };

    setInterval(updateTime, 1000);
    return () => {
      unmunted = true;
    };
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  const handleAddOrder = async () => {
    try {
      await axios.post("http://localhost:3001/api/add-order", order);
      Swal.fire("Merienda ordenada con exito!", "", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetOrdersByDate = async (initialDate, finalDate, nit) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/get-orders/${nit}`,
        {
          initialDate: initialDate,
          finalDate: finalDate,
        }
      );
      const dataOrdersBy = res.data;
      let arrayOrdersBy = [...dataOrdersBy];
      arrayOrdersBy.forEach((el) => {
        el.fecha = el.fecha.slice(0, 10);
      });
      setOrdersByDate(arrayOrdersBy);
      console.log(arrayOrdersBy);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PedidosContext.Provider
      value={{
        schedule,
        handleAddOrder,
        order,
        setOrder,
        initialDate,
        setInitialDate,
        finalDate,
        setFinalDate,
        handleGetOrdersByDate,
        setOrdersByDate,
        ordersByDate,
      }}
    >
      {props.children}
    </PedidosContext.Provider>
  );
};

export default PedidosProvider;
