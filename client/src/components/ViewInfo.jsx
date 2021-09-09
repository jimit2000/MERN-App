import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewInfo = () => {
  const { id } = useParams();
  const [viewData, setViewData] = useState({});
  const [topicData, setData] = useState([]);
  const [commentData, setCommentData] = useState("");
  const [showCommentData, setShowCommentData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/viewinfo", { params: { id: id } });

        if (res.status === 200) {
          const data = await res.data[0].post;
          const viewData = data.find((ele) => {
            return ele._id === id;
          });
          console.log(viewData);
          setViewData(viewData);
          setData(viewData.topicdata);
          setShowCommentData(viewData.comments);
        }else{
          throw new Error("Error ");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/viewinfo", { commentData, id });

      if (res.status === 201) {
        const res = await axios.get("/viewinfo", { params: { id: id } });
        const data = await res.data[0].post;
        const viewData = data.find((ele) => {
          return ele._id === id;
        });
        setCommentData("");
        setShowCommentData(viewData.comments);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="main_content my-5">
        <section className="container shadow viewPage text-center  py-3">
          <figure
            className="text-center "
            style={{ height: "40vh", width: "100%" }}
          >
            <img
              src={`/uploadFile/${viewData.image}`}
              className="imgViewInfo py-1 rounded"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              alt="information"
            />
          </figure>

          <h1>{viewData.topicname}</h1>
          {topicData.map((data, index) => {
            return (
              <>
                <p>{data}</p>
              </>
            );
          })}
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultrices felis sed dolor tincidunt egestas. Duis vel velit neque. Ut
            ligula lorem, suscipit at nisl in, scelerisque lobortis justo. Duis
            ac metus vitae purus vestibulum efficitur. Donec nec enim sed magna
            suscipit scelerisque. Phasellus vitae sollicitudin orci, in
            elementum nunc. Nam molestie mi sit amet porttitor vestibulum. Fusce
            pulvinar justo ipsum, sed ornare ipsum dignissim vel. Nam urna
            metus, pretium ac lorem eu, elementum tristique tellus. Maecenas sit
            amet tincidunt urna. Fusce ac imperdiet mauris, a dictum ex. Nam
            eget venenatis leo. In facilisis tempor sem, ac auctor augue semper
            quis. Aenean euismod massa eget lorem ultricies congue.
          </p>
          <p>
            Aliquam velit dui, pharetra a interdum et, ultricies vitae diam. Nam
            fermentum ante id nisi vestibulum, id maximus nisl fermentum. Etiam
            varius congue nulla, a blandit metus imperdiet eget. Morbi ultricies
            vitae justo vitae dignissim. Vivamus fermentum lobortis odio sit
            amet commodo. Duis commodo massa quis nibh auctor, id rutrum libero
            rutrum. Proin dignissim dapibus lectus, ullamcorper tincidunt urna
            gravida eu. Proin congue interdum odio, vel tempor metus vehicula
            non. Mauris tristique semper pellentesque. Ut in scelerisque mauris.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus.
          </p>
          <p>
            Nam convallis lectus sed justo consequat, vitae scelerisque orci
            hendrerit. Suspendisse vulputate mauris elit, a cursus elit ornare
            convallis. Fusce bibendum eleifend tellus, et cursus leo sagittis
            quis. Pellentesque malesuada elementum magna. Praesent et felis
            vitae ex porttitor bibendum. Fusce elementum felis in imperdiet
            commodo. Donec sed mi dolor.
          </p> */}

          <div className="row">
            <div className="col-md-8 mx-auto col-12 ">
              <form method="post">
                <div className="form-group">
                  <label htmlFor="comment" className="commentLabel">
                    Your Comment
                  </label>
                  <textarea
                    rows="6"
                    value={commentData}
                    onChange={(e) => setCommentData(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onClick={addComment}
                  className="btn btn-primary"
                >
                  Add Comment
                </button>
              </form>
            </div>
          </div>

          {showCommentData.map((data) => {
            return (
              <>
                <div className="comment ">
                  <ul>
                    <li>
                      <h3 className="text-left">jimit</h3>
                    </li>
                    <li>
                      <h4 className="text-left">12/1/200</h4>
                    </li>
                    <li>
                      <h4 className="text-left">12/1/200</h4>
                    </li>
                    <li>
                      <p className="text-left">{data.comment}</p>
                    </li>
                  </ul>
                </div>
              </>
            );
          })}

          {/* <div className="comment ">
            <ul>
              <li>
                <h3 className="text-left">jimit</h3>
              </li>
              <li>
                <h4 className="text-left">12/1/200</h4>
              </li>
              <li>
                <h4 className="text-left">12/1/200</h4>
              </li>
              <li>
                <p className="text-left">
                  fusce bibendum eleifend tellus, et cursus leo sagittis quis.
                  Pellentesque malesuada elementum magna. Praesent et felis
                  vitae ex porttitor bibendum. Fusce elementum felis in
                  imperdiet commodo. Donec sed mi dolor.
                </p>
              </li>
            </ul>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default ViewInfo;
