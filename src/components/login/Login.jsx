import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../context/UserProvider";
import "./login.css";
import lunch from "../../assets/img/lunch.svg";
import lunchLog from "../../assets/img/lunch-log.svg";
import fondo from "../../assets/img/fondo.jpg";
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

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFun() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function blurFun() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFun);
      input.addEventListener("blur", blurFun);
    });
  }, []);

  return (
    <div className="container-login-box">
      <img className="wave" src={fondo} alt="wave"></img>

      <div className="container">
        <div className="img">
          <img src={lunch} alt="icon-lunch" />
        </div>
        <div className="login-container">
          <form action="login2.0.html ">
            <img className="avatar" src={lunchLog} alt="icon-avatar" />
            <h2>MERIENDAS</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h5>Username</h5>
                <input
                  className="input"
                  name="nit"
                  type="text"
                  onChange={(e) => setUserInput(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div two">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div>
                <h5>Password</h5>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {err && (
              <div className="alert alert-danger text-center">
                Debe completar todos los campos
              </div>
            )}

            <button
              type="submit"
              className="btn-login"
              onClick={(e) => handleLogin(e)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
