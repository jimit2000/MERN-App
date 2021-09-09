import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AddPost = () => {
  const [postData, setPostData] = useState([""]);
  const [topicName, setTopicName] = useState("");
  const [imageName, setImageName] = useState("");

  const history = useHistory();

  const [text, setText] = useState([]);
  const [count, setCount] = useState(0);

  const addTopicData = (e) => {
    e.preventDefault();
    setPostData((prevData) => {
      return [...prevData, ""];
    });

    setCount(count + 1);
    const da1 = React.createElement("textarea", {
      type: "text",
      key: count + 1,
      className: "form-control mb-1",
      value: postData[count + 1],
      name: "data",
      "data-index": count + 1,
      onChange: changeInput,
      style: {
        width: "100%",
      },
      placeholder: "Enter Data",
      rows: "6",
    });

    setText([...text, da1]);

    const td = document.querySelector(".topicData");
    console.log(td);
  };

  const changeInput = (e) => {
    const index = e.target.getAttribute("data-index");
    const { name, value } = e.target;
    console.log(postData[index]);
    console.log(value);
    console.log(index);

    setPostData((prevData) => {
      let data = [...prevData];
      data[index] = value;
      return data;
    });
  };

  const changeTopicName = (e) => {
    setTopicName(e.target.value);
  };

  const changePhoto = (e) => {
    setImageName(e.target.files[0]);
    document.querySelector("#previewImage").src = window.URL.createObjectURL(
      e.target.files[0]
    );
    document.querySelector("#previewImage").style.display = "";
  };

  const uploadData = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("topicname", topicName);
      const postDataSplit = postData.join("$%$^");
      formdata.append("data", postDataSplit);
      formdata.append("imageName", imageName);
      const res = await axios.post("/add_post", formdata);

      console.log(res);
      if (res.status === 201) {
        history.push("/");
      } else {
        throw new Error("Error in adding post");
      }
    } catch (err) {
      console.log(`Add post ${err}`);
    }
  };
  return (
    <>
      <Helmet htmlAttributes>
        <title>Add Post</title>
      </Helmet>
      <div className="main_content d-flex justify-content-center align-items-center py-5 ">
        <div className="container-fluid ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6 col-12 addPostPage">
              <form onSubmit={uploadData} encType="multipart/form-data">
                <div className="form-group">
                  <label htmlFor="topic">Topic</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic name"
                    name="topic"
                    value={topicName}
                    onChange={changeTopicName}
                  />
                </div>

                <div className="form-group">
                  <img
                    src=""
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "contain",
                      display: "none",
                    }}
                    name="previewImage"
                    id="previewImage"
                    alt="preview image"
                  />
                  <br />
                  <label htmlFor="postdata">Deag or choose Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="imageName"
                    onChange={changePhoto}
                    className="form-control mt-3"
                  />
                </div>

                <div className="form-group topicData  ">
                  <textarea
                    type="text"
                    className="form-control mb-1"
                    value={postData[0]}
                    name="data"
                    data-index="0"
                    onChange={changeInput}
                    style={{ width: "100%" }}
                    placeholder="Enter Data"
                    rows="6"
                  ></textarea>
                  {text.map((d) => {
                    return d;
                  })}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={addTopicData}
              >
                Add new Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
