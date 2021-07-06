import React, { useEffect, useState } from "react";
import axios from "axios";
import "./register.css";
import Swal from "sweetalert2";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [idUser, setIdUser] = useState("");
  const [passwordUser, setPasswordUSer] = useState("");
  const [rolUser, setRolUser] = useState("");
  const [entityUser, setEntityUser] = useState("");
  const [dataUSer, setDataUser] = useState({});

  useEffect(() => {
    setDataUser({
      name: userName,
      nit: idUser,
      password: passwordUser,
      rol: rolUser,
      entity: entityUser,
    });
  }, [userName, idUser, passwordUser, rolUser, entityUser]);

  const registerUsers = async (dataUSer) => {
    try {
      const res = await axios.post(
        " http://localhost:3001/api/register-users",
        dataUSer
      );

      if (res) {
        Swal.fire(`Usuario creado con exito!`, "", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterUser = (e, dataUSer) => {
    e.preventDefault();

    if (
      !userName.trim() &&
      !passwordUser.trim() &&
      !idUser.trim() &&
      !rolUser.trim() &&
      !entityUser.trim()
    ) {
      Swal.fire(`Debe llenar todos los campos`, "", "warning");
      return;
    }
    registerUsers(dataUSer);
    setUserName("");
    setIdUser("");
    setPasswordUSer("");
    setRolUser("");
    setEntityUser("");
  };

  return (
    <div className="register-container">
      <form className="form-register-container">
        <h1 className="text-center">REGISTRAR</h1>

        <input
          type="text"
          placeholder="nombre..."
          name="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="number"
          placeholder="identificacion..."
          name="idUser"
          onChange={(e) => setIdUser(e.target.value)}
        />
        <input
          type="pass"
          placeholder="contraseña..."
          name="passwordUser"
          onChange={(e) => setPasswordUSer(e.target.value)}
        />
        <select
          defaultValue={"DEFAULT"}
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setRolUser(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Selecciona el rol
          </option>
          <option value="usuario">usuario</option>
          <option value="admin">admin</option>
        </select>

        <select
          defaultValue={"DEFAULT"}
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setEntityUser(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Selecciona la entidad
          </option>
          <option value="FOCA">FOCA</option>
          <option value="COFCA">COFCA</option>
          <option value="IMES">IMES</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={(e) => handleRegisterUser(e, dataUSer)}
        >
          REGISTRAR
        </button>
      </form>
    </div>
  );
};

export default Register;
