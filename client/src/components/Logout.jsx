import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../App";



const Logout = () => {
  const [logoutSatate, setLogout] = useState("logout.....");
  const history = useHistory();
  const { state, dispatch } = useContext(UserAuth);

  const logoutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        // alert(data.message);
        setLogout("You have been logout you will redirect home automatically");
        setTimeout(() => {
          dispatch({ type: "user", payload: false });
          history.push("/");
        }, 2000);
      } else {
        // alert(data.message);
        setLogout(`There is some problem `);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <h1>{logoutSatate}</h1>
    </div>
  );
};

export default Logout;
