import React, { useState } from "react";
// import { MdFormatListBulleted } from "react-icons/md";
import { useHistory } from "react-router-dom";
import logo from "../webdev.svg";
import { ToastContainer, toast } from "react-toastify";


const Signup = () => {
  const [signup, setSignup] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    conpassword: "",
  });
  const history = useHistory();
  const changeFormData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    setSignup(true);

    try {
      const data = await fetch("/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const resData = await data.json();
      if (data.status === 201) {
        alert("Register successfully");
        console.log(data);
        console.log(resData);
        setSignup(false);
        history.push("/signin");
      } else {
        
        toast.error(resData.message);

        setSignup(false);

        console.log("show  " + resData);
      }
    } catch (err) {
      console.log(err);
      alert("Error ::: " + err);
    }
  };

  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="signin_div">
        <div className="container mx-auto" id="signin_form">
          <div className="row">
            <div className="col-12 col-sm-6 d-flex justify-content-center align-items-center ">
              <figure>
                <img className="img-fluid" src={logo} alt="login img" />
              </figure>
            </div>
            <div className="col-12 col-sm-6  ">
              <div className="container">
                <h2 className="font-weight-bold text-warning">Registration</h2>
                <form method="POST" onSubmit={formSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      value={userData.name}
                      onChange={changeFormData}
                      name="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={userData.email}
                      onChange={changeFormData}
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone"
                      value={userData.phone}
                      onChange={changeFormData}
                      name="phone"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work">Work:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="work"
                      placeholder="Enter Work"
                      value={userData.work}
                      onChange={changeFormData}
                      name="work"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="Enter password"
                      value={userData.Password}
                      onChange={changeFormData}
                      name="password"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pwd"
                      placeholder="Enter confirm password"
                      value={userData.conpassword}
                      onChange={changeFormData}
                      name="conpassword"
                    />
                  </div>

                  {signup ? (
                    <button type="submit" className="btn btn-primary">
                      <span className="spinner-border spinner-border-sm"></span>
                      signup...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={formSubmit}
                      className="btn btn-primary"
                    >
                      Submit
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

export default Signup;
