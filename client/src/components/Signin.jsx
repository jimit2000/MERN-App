import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../App";
import { ToastContainer, toast } from "react-toastify";

const Signin = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserAuth);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const changeLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    try {
      setLoading(true);
      const data = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      // alert("hello");
      const resData = await data.json();

      if (data.status === 200) {
        toast.success(resData.message);

        dispatch({ type: "user", payload: true });
        setLoading(false);

        setTimeout(() => {
          history.push("/");
        }, 1500);

      } else {
        setLoading(false);
        // alert();
        toast.error(resData.message);

        // console.log("show  " + resData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="signin_div">
        <div className="container p-sm-5 p-xs-1 mx-auto" id="signin_form">
          <div className="row ">
            <div className="col-12 col-sm-6 ">
              <figure>
                <img
                  className="img-fluid"
                  src="img/login.svg"
                  alt="login img"
                />
              </figure>
            </div>
            <div className="col-12 col-sm-6  ">
              <div className="container d-flex  flex-column">
                <h2 className="font-weight-bold text-warning">Login</h2>
                <form method="post">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      name="email"
                      value={loginData.email}
                      onChange={changeLoginData}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd"
                      placeholder="Enter password"
                      name="password"
                      onChange={changeLoginData}
                      value={loginData.password}
                    />
                  </div>

                  {loading ? (
                    <button type="submit" className="btn btn-primary">
                      <span className="spinner-border spinner-border-sm"></span>
                      Signing..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={formSubmit}
                      className="btn btn-primary"
                    >
                      Signin
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
