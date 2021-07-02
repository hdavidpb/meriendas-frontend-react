import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import "./login.css";
import Swal from "sweetalert2";

const Login = ({ history }) => {
  //CONTEXT USER
  const { user, setUser } = useContext(UserContext);

  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (user.state) {
      history.push("/");
    }
  }, [user.state, history]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userInput.trim() || !password.trim()) {
      console.log("Espacios vacios");
      setErr(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/auth", {
        nit: userInput,
        password: password,
      });

      const data = { ...res.data[0] };
      console.log(data);
      if (data.name === undefined || data.nit === undefined) {
        Swal.fire(`${res.data.msg} !`, "", "warning");

        console.log(res.data.msg);
        return;
      }
      const dataUser = {
        nit: data.nit,
        name: data.name,
        entity: data.entidad,
        state: true,
      };
      localStorage.setItem("userMeriendas", JSON.stringify(dataUser));
      setUser(dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <form className="form-container">
        <h1 className="text-center">LOGIN</h1>
        <input
          type="text"
          name="nit"
          placeholder="usuario..."
          onChange={(e) => setUserInput(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="contraseña..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && (
          <div className="alert alert-danger text-center">
            Debe completar todos los campos
          </div>
        )}
        <button className="btn btn-primary" onClick={(e) => handleLogin(e)}>
          INGRESAR
        </button>
        <Link className="btn btn-secondary" to="/register">
          REGISTRAR
        </Link>
      </form>
    </div>
  );
};

export default withRouter(Login);
