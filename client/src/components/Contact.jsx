import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loader/Loading";

import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const history = useHistory();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/contact", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setUserData({
          ...userData,
          name: data.name,
          phone: data.phone,
          email: data.email,
        });
        setLoading(false);
      } else {
        setLoading(false);
        history.push("/");

      }
    };
    checkLogin();
  }, []);

  const changeFormData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const contact_Form_Submit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("/contact", {
        method: "post",
        headers: {
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.status === 201) {
        console.log(data);
        toast.success("Your message has been added");
        setTimeout(() => {
          history.push("/");
        }, 4000);
        // alert(`Submitted
        //   ${res.statusText}`);
      } else {
        console.log(data);

        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };  

  return (
    <>
    {loading ? <Loading/> : 
      <>
      <div className="container mt-5 ">
        <div className="row mx-auto  ">
          <div className="col-12 col-md-4 contact_shadow">
            <div className="text-center">
              <span style={{ marginRight: "10px" }}>
                <AiFillPhone />
              </span>
              <span>{userData.phone}</span>
            </div>
          </div>
          <div className="col-12 col-md-4 contact_shadow">
            <div className="text-center">
              <span style={{ marginRight: "10px" }}>
                <MdEmail />
              </span>
              <span>{userData.email}</span>
            </div>
          </div>
          <div className="col-12 col-md-4  contact_shadow">
            <div className="text-center">
              <span style={{ marginRight: "10px" }}>
                <FaAddressCard />
              </span>
              <span>Ahemdabad</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container shadow m-5 p-5 mx-auto contact_shadow">
        <form method="post">
          <div className="form-row">
            <div className="form-group col-md-4 col-12">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                readOnly="readOnly"
                id="name"
                name="name"
                value={userData && userData.name}
                onChange={changeFormData}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group col-md-4 col-12">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                readOnly="readOnly"
                id="email"
                name="email"
                value={userData && userData.email}
                onChange={changeFormData}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group col-md-4 col-12">
              <label htmlFor="address">Phone</label>
              <input
                type="number"
                className="form-control"
                readOnly="readOnly"
                id="number"
                name="phone"
                value={userData && userData.phone}
                onChange={changeFormData}
                placeholder="Enter number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              cols="12"
              rows="5"
              className="form-control"
              id="Message"
              name="message"
              value={userData.message}
              onChange={changeFormData}
              placeholder="Enter message"
            />
          </div>

          <button
            type="submit"
            onClick={contact_Form_Submit}
            className="btn btn-primary"
          >
            Send message
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       </>
    }
    </>

   
  );
};

export default Contact;
