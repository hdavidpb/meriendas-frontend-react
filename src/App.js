import React, { useEffect, useContext } from "react";

import { UserContext } from "./context/UserProvider";
import Aos from "aos";
import MenuAvailable from "./components/SolicitarMenu/Menu/MenuAvailable";
import Menu from "./components/Menu/Menu";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Entregar from "./components/EntregarMerienda/Entregar";
import MisPedidos from "./components/MisPedidos/MisPedidos";

function App() {
  const { user, getRol, setRoll, roll } = useContext(UserContext);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (user.nit) {
      getRol();
    } else {
      setRoll(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.nit]);

  //PRIVATE RUTES
  const PrivateRute = ({ component, path, ...rest }) => {
    if (localStorage.getItem("userMeriendas")) {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };

  const PrivateRuteAdmin = ({ component, path, ...rest }) => {
    if (roll === "admin") {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="/configurar-menu" {...rest} />;
    }
  };

  const PrivateRuteAdminEntregar = ({ component, path, ...rest }) => {
    if (roll === "admin") {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="/entregar-merienda" {...rest} />;
    }
  };

  const PrivateRuteRegister = ({ component, path, ...rest }) => {
    if (roll === "admin") {
      return <Route component={component} path={path} {...rest} />;
    } else {
      return <Redirect to="/" {...rest} />;
    }
  };
  return user.state !== null ? (
    <Router>
      <div className="container-app">
        <Navbar />
        {user.name !== null && (
          <h5 className="mt-2 bg-light p-3">{`Bienvenido/a ${user.name}`}</h5>
        )}
        <Switch>
          <PrivateRute path="/" component={MenuAvailable} exact />
          <PrivateRute path="/mis-pedidos" component={MisPedidos} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRuteRegister path="/register" component={Register} exact />
          <PrivateRuteAdmin path="/configurar-menu" component={Menu} exact />
          <PrivateRuteAdminEntregar
            path="/entregar-merienda"
            component={Entregar}
            exact
          />
        </Switch>
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;
