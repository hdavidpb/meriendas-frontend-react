import axios from "axios";
import Swal from "sweetalert2";
import React, { useContext, useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import { MenuContext } from "../../context/MenuProvider";
import { PedidosContext } from "../../context/PedidosProvider";
import { UserContext } from "../../context/UserProvider";
import "./entregar.css";
import EntregarList from "./EntregarList";
const Entregar = () => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const { user } = useContext(UserContext);
  const { menu } = useContext(MenuContext);
  const { initialDate, finalDate, setInitialDate, setFinalDate } =
    useContext(PedidosContext);

  const [action, setAction] = useState("");
  const [enabledBtnAction, setEnabledBtnAction] = useState(true);
  // const [checkAll, setCheckAll] = useState(false);

  const [nit, setNit] = useState("");
  const [jornada, setJornada] = useState(0);
  const [sede, setSede] = useState("");
  const [state, setState] = useState("");
  const [menuName, setMenuName] = useState("");
  const [filterData, setFilterData] = useState({});

  const [filterOrder, setFilterOrder] = useState([]);
  const [checkedOrders, setCheckedOrders] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setFilterData({
      initialDate: initialDate,
      finalDate: finalDate,
      nit: Number(nit),
      jornada: Number(jornada),
      sede: sede,
      state: state,
      menuName: menuName,
    });
  }, [initialDate, finalDate, nit, jornada, sede, state, menuName]);

  ////////////////CHANGE CHECKED///////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const ordersChecked = filterOrder.filter((el) => el.check !== false);
    setCheckedOrders(ordersChecked);
  }, [filterOrder]);

  //////////////////////FUNCTION GET ALL FILTER ORDERS ///////////////////////////////////////////////////////////////////
  const handleGetByFilterOrders = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/get-all-employed-orders",
        filterData
      );
      const arrayResult = res.data;
      let showArray = [];
      arrayResult.forEach((el) => {
        showArray.push({ ...el, check: false });
      });

      setFilterOrder(showArray);
      console.log(filterOrder);
      console.log(showArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStateCheckedOrders = async (item, action, user) => {
    try {
      await axios.put(
        `http://localhost:3001/api/updateTo-delivered-state/${item.id}`,
        {
          state: action,
          user_nit: user.nit,
        }
      );

      setFilterData({
        initialDate: initialDate,
        finalDate: finalDate,
        nit: Number(nit),
        jornada: Number(jornada),
        sede: sede,
        state: state,
        menuName: menuName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAction = (e) => {
    setAction(e.target.value);
    setEnabledBtnAction(false);
  };

  const handleAplyAction = (action, user) => {
    if (checkedOrders.length === 0)
      Swal.fire("No se han realizado acciones ", "", "warning");

    let newArrayPostAction = [...filterOrder];
    newArrayPostAction.forEach((el) => {
      if (el.check) el.estado = action;
      el.check = false;
    });
    setFilterData(newArrayPostAction);

    checkedOrders.forEach((el) => {
      handleUpdateStateCheckedOrders(el, action, user);
      console.log(el, action);
    });

    if (action === "entregado" && checkedOrders.length > 1) {
      Swal.fire("Ordenes entregadas!", "", "success");
    } else if (action === "entregado" && checkedOrders.length === 1) {
      Swal.fire("Orden entregada!", "", "success");
    }

    if (action === "eliminado" && checkedOrders.length > 1) {
      Swal.fire("Ordenes eliminadas!", "", "success");
    } else if (action === "eliminado" && checkedOrders.length === 1) {
      Swal.fire("Orden eliminada!", "", "success");
    }

    setChecked(false);

    setCheckedOrders([]);
    setFilterData({
      initialDate: initialDate,
      finalDate: finalDate,
      nit: Number(nit),
      jornada: Number(jornada),
      sede: sede,
      state: state,
      menuName: menuName,
    });
  };

  ////////////////////////////////////CHANGE CHACKED//////////////////////////////////////////////////////////////////////////////
  const handleCheckedAllOrders = () => {
    const allOrdersChecked = [...filterOrder];
    allOrdersChecked.forEach((el) => {
      if (el.estado === "pendiente") {
        el.check = !checked;
      }
    });

    setFilterOrder(allOrdersChecked);
    setChecked(!checked);
  };

  const handleCheckedOrder = (item, i) => {
    if (item.estado === "pendiente") {
      const arraySelected = [...filterOrder];
      arraySelected.forEach((el, index) => {
        if (index === i) {
          el.check = !el.check;
        }
        setFilterOrder(arraySelected);
      });
    }
  };

  return (
    <div className="delivered-consult-orders-container">
      <div className="filters-header">
        <div className="filters-header-input-container">
          <input
            value={initialDate}
            className="input-date "
            type="date"
            onChange={(e) => setInitialDate(e.target.value)}
          />
          <input
            value={finalDate}
            className="input-date"
            type="date"
            onChange={(e) => setFinalDate(e.target.value)}
          />
          <input
            value={nit}
            type="number"
            placeholder="Id empleado"
            onChange={(e) => setNit(e.target.value)}
          />

          <select
            defaultValue={"DEFAULT"}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setJornada(e.target.value)}
          >
            <option value="">Jornada</option>
            <option value="1">MAÑANA</option>
            <option value="2">TARDE</option>
          </select>

          <select
            defaultValue={"DEFAULT"}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setSede(e.target.value)}
          >
            <option value="">Ubicación</option>
            <option value="VIVA_ASISTENCIAL">VIVA ASISTENCIAL</option>
            <option value="VIVA_ADMINISTRATIVO">VIVA ADMINISTRATIVO</option>
            <option value="FOCA_NORTE">FOCA NORTE</option>
            <option value="SALA_AZUL">SALA AZUL</option>
            <option value="EGLE">EGLE</option>
            <option value="51B_PISO_1">51B PISO 1</option>
            <option value="51B_PISO_2">51B PISO 2</option>
            <option value="LOCAL4">LOCAL 4</option>
            <option value="FARMACIA">CIRUGIA</option>
          </select>

          <select
            defaultValue={"DEFAULT"}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Estado</option>
            <option value="pendiente">PENDIENTE</option>
            <option value="entregado">ENTREGADO</option>
            <option value="eliminado">ELIMINADO</option>
          </select>

          <select
            defaultValue={"DEFAULT"}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => setMenuName(e.target.value)}
          >
            <option value="">Menú</option>
            {menu.map((menu) => (
              <option key={menu.uid} value={menu.title}>
                {menu.title}
              </option>
            ))}
          </select>
        </div>
        <div className="btn-filter">
          <button
            className="btn btn-primary"
            onClick={() => handleGetByFilterOrders()}
          >
            BUSCAR
          </button>
        </div>
      </div>

      {/***********************************FILTER DATA CONTAINER +++++++++++++++++++++++++++++++++++++++++++++++*/}
      <div className="filter-orders-list-footer">
        <ul className="orders-list header">
          <li className="order-list-item counter">#</li>
          <li className="order-list-item ckeckboxBox">
            <input
              type="checkbox"
              id="checkALL"
              onChange={() => handleCheckedAllOrders()}
              checked={checked}
            />
            <div className="state-mark"></div>
          </li>

          <li className="order-list-item"> ESTADO</li>
          <li className="order-list-item"> ENTIDAD</li>
          <li className="order-list-item"> SEDE</li>
          <li className="order-list-item"> EMPLEADO</li>
          <li className="order-list-item"> DÍA</li>
          <li className="order-list-item"> JORNADA</li>
          <li className="order-list-item"> MENÚ</li>
          <li className="order-list-item"> PRECIO</li>
        </ul>
      </div>

      {/*////////////////////// LIST ////////////////////////////////////////////*/}
      <div className="orders-container ">
        {filterOrder.map((item, index) => (
          <EntregarList
            key={item.id}
            item={item}
            index={index}
            handleCheckedOrder={handleCheckedOrder}
          />
        ))}
      </div>
      {filterOrder.length > 0 ? (
        <div className="actions-container">
          <div className="actios-header">
            <h3>Acciones</h3>
            <select
              defaultValue={"DEFAULT"}
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleChangeAction(e)}
            >
              <option value="DEFAULT" disabled>
                --Seleccione una acción--
              </option>
              <option value="entregado">ENTREGAR</option>
              <option value="eliminado">ELIMINAR</option>
            </select>
            <button
              className="btn btn-secondary"
              disabled={enabledBtnAction}
              onClick={() => handleAplyAction(action, user)}
            >
              APLICAR ACCIÓN
            </button>
          </div>
          <hr />
          <div className="btn-downloadExcel">
            <ExcelFile
              element={
                <button className="btn btn-success">Exportar a Excel</button>
              }
              filename="pedidos"
            >
              <ExcelSheet data={filterOrder} name="pedidos">
                <ExcelColumn label="ESTADO" value="estado" />
                <ExcelColumn label="ENTIDAD" value="entidad" />
                <ExcelColumn label="EMPLEADO" value="nombre_empleado" />
                <ExcelColumn label="ID" value="nit_empleado" />
                <ExcelColumn label="DIA" value="fecha" />
                <ExcelColumn
                  label="JORNADA"
                  value={(el) => (el.jornada === 1 ? "MAÑANA" : "TARDE")}
                />
                <ExcelColumn label="MENÚ" value="nombre_menu" />
                <ExcelColumn label="PRECIO" value="precio" />
              </ExcelSheet>
            </ExcelFile>
            <div>
              <h2>
                {`$ ${new Intl.NumberFormat("de-DE").format(
                  filterOrder.reduce((acc, item) => acc + item.precio, 0)
                )}`}
              </h2>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Entregar;
