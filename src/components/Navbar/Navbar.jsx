import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { PedidosContext } from "../../context/PedidosProvider";
import "./navbar.css";
import { Link, NavLink, withRouter } from "react-router-dom";

const Navbar = (props) => {
  const { user, setUser, roll } = useContext(UserContext);
  const { setOrdersByDate } = useContext(PedidosContext);
  const closeSesion = () => {
    localStorage.removeItem("userMeriendas");
    props.history.push("/login");
    setUser({ nit: null, name: null, rol: null, state: false });
    setOrdersByDate([]);
  };

  return (
    <nav className="nav-container mt-2">
      <div className="nav-brand">
        <h3>Meriendas</h3>
      </div>
      <div className="nav-options">
        {user.state ? (
          <ul className="nav-list">
            {roll === "admin" ? (
              <>
                <NavLink className="btn btn-outline-info" to="/" exact>
                  Solicitar
                </NavLink>
                <NavLink
                  className="btn btn-outline-info"
                  to="/mis-pedidos"
                  exact
                >
                  Mis pedidos
                </NavLink>
                <NavLink
                  className="btn btn-outline-secondary"
                  to="/configurar-menu"
                  exact
                >
                  Conf. Menú
                </NavLink>
                <NavLink
                  className="btn btn-outline-secondary"
                  to="/entregar-merienda"
                  exact
                >
                  Entregar
                </NavLink>
                <Link className="btn btn-success" to="/register">
                  R
                </Link>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline-info" to="/" exact>
                  Solicitar
                </NavLink>
                <NavLink
                  className="btn btn-outline-info"
                  to="/mis-pedidos"
                  exact
                >
                  Mis pedidos
                </NavLink>
              </>
            )}
          </ul>
        ) : null}
        <div className="nav-list-login">
          {!user.state ? (
            <NavLink className="btn btn-success" to="/login">
              Iniciar Sesión
            </NavLink>
          ) : (
            <button className="btn btn-danger" onClick={() => closeSesion()}>
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
