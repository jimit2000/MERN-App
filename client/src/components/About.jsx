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
    {loading ? <Loading/> : 
      <div className="aboutPage d-flex justify-content-center align-items-center">
        <div className="container shadow p-5 ">
          <div className="row">
            <div className="col-md-4  order-0 order-md-0">
              <figure>
                <img height="300" lading="lazy" src={ProImg} alt="profile" />
              </figure>
            </div>

            <div className="col-md-6  order-2 order-md-1">
              <h2>{userData.name}</h2>
              <h3>{userData.work}</h3>
              <p>
                Ranking : <span>1/10</span>
              </p>

              {/* t */}

              <ul className="nav nav-pills mt-5" role="tablist">
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
              <p>Student</p>
            </div>
            <div className="col-md-8  order-0 order-md-1">
              <div className="tab-content">
                <div id="About" className="container tab-pane active">
                  <table>
                  <tbody>
                    <tr className="mt-5">
                      <td>Userid : </td>
                      <td>{userData._id}</td>
                    </tr>
                    <tr>
                      <td>Name : </td>
                      <td>{userData.name}</td>
                    </tr>
                    <tr>
                      <td>Email : </td>
                      <td>{userData.email}</td>
                    </tr>
                    <tr>
                      <td>Phone : </td>
                      <td>{userData.phone}</td>
                    </tr>
                    <tr>
                      <td>work : </td>
                      <td>{userData.work}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div id="Timeline" className="container tab-pane fade">
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
    }
    </>

  );
};

export default About;
