import React from "react";
import "./register.css";
const Register = () => {
  return (
    <div className="register-container">
      <form className="form-register-container">
        <h1 className="text-center">REGISTRAR</h1>

        <input type="text" placeholder="nombre..." />
        <input type="text" placeholder="identificacion..." />
        <input type="pass" placeholder="contraseña..." />
        <select
          defaultValue={"DEFAULT"}
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => console.log(e.target.value)}
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
          onChange={(e) => console.log(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Selecciona la entidad
          </option>
          <option value="FOCA">FOCA</option>
          <option value="COFCA">COFCA</option>
          <option value="IMES">IMES</option>
        </select>
        <button className="btn btn-primary">REGISTRAR</button>
      </form>
    </div>
  );
};

export default Register;
