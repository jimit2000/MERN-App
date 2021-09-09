import React, { useEffect, useState } from "react";
import ProImg from "../chriss.jpg";
import Loading from "../Loader/Loading";
import { useHistory, Link } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      // alert("auth react");
      const res = await fetch("/aboutPage", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // console.log(res1);

      const res1 = await res.json();

      //  alert(res.status);
      if (res.status === 200) {
        console.log(res1);
        // alert(res.statusText);
        setUserData(res1);
        setLoading(false);
      } else {
        // alert(res1.message);
        setLoading(false);

        history.push("/");
      }
      console.log(res.status);
      setLoading(false);
    };
    checkLogin();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main_content d-flex justify-content-center align-items-center ">
          <div className="container shadow p-5 aboutPage m-3  ">
            <div className="row">
              <div className="col-md-4  d-flex justify-content-center align-items-center aboutData order-0 order-md-0">
                <figure>
                  <img height="300" lading="lazy" src={ProImg} alt="profile" />
                </figure>
              </div>

              <div className="col-md-6  order-2 order-md-1  aboutData">
                <ul>
                  <li>
                    <h1>{userData.name}</h1>
                  </li>
                  <li>
                    <p>{userData.work}</p>
                  </li>
                </ul>
                {/* <h1>{userData.name}</h1>
              <p>{userData.work}</p> */}

                {/* t */}

                <ul className="nav nav-pills " role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#About"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#Timeline">
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2  order-1 order-md-2">
                <Link className="btn btn-outline-info" to="about/editprofile">
                  Edit Profile
                </Link>
                {/* <buttton >Edit Profile</buttton> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4  order-1 order-md-0">
                <hr />
                <p>Student</p>
                <p>Instagram</p>
                <p>{userData.name}</p>
                <p>{userData.work}</p>
               
              </div>
              <div className="col-md-8 col-12 mt-3  order-0 order-md-1">
                <div className="tab-content">
                  <div id="About" className="container tab-pane active">
                
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Userid  </td>
                          <td>{userData._id}</td>
                        </tr>
                        <tr>
                          <td>Name</td>
                          <td>{userData.name}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{userData.email}</td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td>{userData.phone}</td>
                        </tr>
                        <tr>
                          <td>work</td>
                          <td>{userData.work}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div id="Timeline" className="container mt-3 tab-pane fade">
                    <h3>Timeline 1</h3>
                    <p>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
