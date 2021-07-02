import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = (props) => {
  const dataUser = {
    nit: null,
    name: null,
    entity: null,
    rol: null,
    state: null,
  };
  const [user, setUser] = useState(dataUser);
  const [roll, setRoll] = useState(null);
  const [date, setDate] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userMeriendas")) {
      setUser(JSON.parse(localStorage.getItem("userMeriendas")));
      console.log("EXISTEE!");
    } else {
      setUser({ nit: null, name: null, entity: null, rol: null, state: false });
    }
  }, []);

  const getRol = async () => {
    const res = await axios.post("http://localhost:3001/api/get-rol", {
      nit: user.nit,
    });
    console.log(res);
    setRoll(res.data[0].rol);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, getRol, roll, setRoll, date, setDate }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
