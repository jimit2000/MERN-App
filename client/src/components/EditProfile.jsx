import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loader/Loading";

const EditProfile = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    work: "",
  });
  const getUserData = async () => {
    try {
      const res = await fetch("/authenticate", {
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
          id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          work: data.work,
        });
        setLoading(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(`Edit Profile Error ::: ${err}`);
    }
  };

  //form data change
  const changeInput = (e) => {
    //   alert("v");
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //submit form
  const userFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/editprofile", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.status === 200) {
        // alert(data.message);
        toast.success("Your Profile has been changed");
        setTimeout(() => {
          history.push("/about");
        }, 4000);
      } else {
        toast.warn(data.message);

        // alert(data.message);
      }
    } catch (err) {
      console.log(`Submit EditProfile Err :: ${err}`);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="main_content d-flex justify-content-center align-items-center">
            <div className="container-fluid  ">
              <div className="row d-flex justify-content-center align-items-center ">
                <div className="col-11 col-md-6 shadow p-4 editProfile">
                  <h1 className="text-center font-weight-bold">Edit Profile</h1>
                  <form method="post">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={userData.name}
                        onChange={changeInput}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userData.email}
                        onChange={changeInput}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={userData.phone}
                        onChange={changeInput}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Work</label>
                      <input
                        type="text"
                        className="form-control"
                        name="work"
                        value={userData.work}
                        onChange={changeInput}
                      />
                    </div>
                    <input
                        type="submit"
                        value="Submit"
                      onClick={userFormSubmit}
                      className="btn btn-primary"
                      style={{border:"none"}}

                      />
                 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
