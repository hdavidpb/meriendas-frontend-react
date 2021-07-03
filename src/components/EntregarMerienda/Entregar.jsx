import axios from "axios";
import el from "date-fns/esm/locale/el/index.js";
import React, { useContext, useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import { MenuContext } from "../../context/MenuProvider";
import { PedidosContext } from "../../context/PedidosProvider";
import { UserContext } from "../../context/UserProvider";
import "./entregar.css";
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
  const [checkAll, setCheckAll] = useState(false);

  const [nit, setNit] = useState("");
  const [jornada, setJornada] = useState(0);
  const [sede, setSede] = useState("");
  const [state, setState] = useState("");
  const [menuName, setMenuName] = useState("");
  const [filterData, setFilterData] = useState({});

  const [filterOrder, setFilterOrder] = useState([]);
  const [checkedOrders, setCheckedOrders] = useState([]);
  const [checked, setChecked] = useState(true);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStateCheckedOrders = async (item, action, user) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/api/updateTo-delivered-state/${item.id}`,
        {
          state: action,
          user_nit: user.nit,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAction = (e) => {
    setAction(e.target.value);
    setEnabledBtnAction(false);
  };

  const handleAplyAction = (action, user) => {
    let newArrayPostAction = [...filterOrder];
    newArrayPostAction.forEach((el) => {
      if (el.check) el.estado = action;
    });
    setFilterData(newArrayPostAction);

    checkedOrders.forEach((el) => {
      handleUpdateStateCheckedOrders(el, action, user);
      console.log(el, action);
    });
  };

  ////////////////////////////////////CHANGE CHACKED//////////////////////////////////////////////////////////////////////////////
  const handleCheckedAllOrders = () => {
    const allOrdersChecked = [...filterOrder];
    allOrdersChecked.forEach((el) => {
      el.check = checked;
    });

    setFilterOrder(allOrdersChecked);
    setChecked(!checked);
  };

  const handleCheckedOrder = (i) => {
    const arraySelected = [...filterOrder];
    arraySelected.forEach((el, index) => {
      if (index === i) {
        el.check = !el.check;
      }
      setFilterOrder(arraySelected);
      console.log(arraySelected);
    });
  };

  ////////////////CHANGE CHACKED///////////////////7

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

      {/* **********************+*****FILTER DATA CONTAINER ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <div className="filter-orders-list-footer ">
        <ul className="orders-list header">
          <li className="order-list-item checkAll">
            <input
              type="checkbox"
              id="checkALL"
              onChange={() => handleCheckedAllOrders()}
            />
          </li>
          <li className="order-list-item"> ESTADO</li>
          <li className="order-list-item"> ENTIDAD</li>
          <li className="order-list-item"> EMPLEADO</li>
          <li className="order-list-item"> DÍA</li>
          <li className="order-list-item"> JORNADA</li>
          <li className="order-list-item"> MENÚ</li>
          <li className="order-list-item"> PRECIO</li>
        </ul>
      </div>
      <div className="orders-container ">
        {filterOrder.map((item, index) => (
          <ul key={item.id} className="orders-list">
            <li className="order-list-item ckeckboxBox">
              <input
                type="checkbox"
                id="check"
                checked={item.check}
                onChange={() => handleCheckedOrder(index)}
              />
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
                item.check
                  ? "order-list-item selected-item "
                  : "order-list-item"
              }
            >
              {item.entidad}
            </li>
            <li
              className={
                item.check
                  ? "order-list-item selected-item "
                  : "order-list-item"
              }
            >
              {item.nombre_empleado}
            </li>
            <li
              className={
                item.check
                  ? "order-list-item selected-item "
                  : "order-list-item"
              }
            >
              {item.fecha.slice(0, 10)}
            </li>
            <li
              className={
                item.check
                  ? "order-list-item selected-item "
                  : "order-list-item"
              }
            >
              {item.jornada === 1 ? "MAÑANA" : "TARDE"}
            </li>
            <li
              className={
                item.check
                  ? "order-list-item selected-item "
                  : "order-list-item"
              }
            >
              {item.nombre_menu}
            </li>
            <li
              className={
                item.check
                  ? "order-list-item selected-item "
                  : "order-list-item"
              }
            >{`$ ${new Intl.NumberFormat("de-DE").format(item.precio)}`}</li>
          </ul>
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
                --Seleccione una acción
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
                <ExcelColumn label="DIA" value="fecha" />
                <ExcelColumn
                  label="JORNADA"
                  value={(el) => (el.jornada === 1 ? "MAÑANA" : "TARDE")}
                />
                <ExcelColumn label="MENÚ" value="nombre_menu" />
                <ExcelColumn label="PRECIO" value="precio" />
              </ExcelSheet>
            </ExcelFile>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Entregar;
