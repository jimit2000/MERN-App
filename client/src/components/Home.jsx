import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [homeData, setHomeData] = useState([]);
  const getData = async () => {
    try {
      //  const res = await axios.get("/getHomeData");
      // const res = await fetch("/getHomeData", {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      // });
      const res = await axios.get("/getHomeData");
      if (res.status === 200) {
        const data = await res.data;
        setHomeData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container searchSection shadow  p-4 mt-4 ">
        <form className="mx-auto ">
          <div className="row mx-auto">
            <div className="col-md-10 col-sm-10 col-12">
              <div className="form-group">
                <input
                  type="search"
                  placeholder="Search here"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-1 col-12">
              <button className="btn btn-primary px-4">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="main_content">
        <div className="container ">
          <div className="row">
            {homeData.map((data, index) => {
              return data.post.map((data2, index2) => {
                return (
                  <>
                    <div
                      className="col-md-4 col-6 mt-3 d-flex justify-content-center"
                      key={index}
                    >
                      <div className="card shadow blog">
                        <Link className="link" to={`/view_info/${data2._id}`}>
                          <img
                            clLinkssName="card-img-top img-fluid borderMine"
                            src={`uploadFile/${data2.image}`}
                            alt="Card image"
                            style={{
                              objectFit: "contain",
                              height: "80%",
                              width: "100%",
                            }}
                          />

                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {data2.topicname}
                            </h4>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              });
            })}

            {/* <div className="col-md-4 col-6 mt-3   d-flex justify-content-center " style={{visibility:"hidden"}} >
              <div className="card shadow blog" style={{ width: "300px" }}>
                <img
                  className="card-img-top img-fluid"
                  src="img/signupimg.svg"
                  alt="Card image"
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h4 className="card-title text-center">Javascript</h4>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
