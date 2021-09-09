import React, { useReducer, createContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import Logout from "./components/Logout";
import EditProfile from "./components/EditProfile";

import MainLoading from "./Loader/MainLoading";
import ViewInfo from "./components/ViewInfo";
import Footer from "./components/Footer";
import AddPost from "./components/AddPost";

const Routing = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/about/editprofile">
          <EditProfile />
        </Route>
        <Route exact path="/view_info/:id">
          <ViewInfo />
        </Route>
        <Route exact path="/add_post">
          <AddPost />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return action.payload;

    default:
      return state;
  }
};
const UserAuth = createContext();

const App = () => {
  var init;
  const [state, dispatch] = useReducer(reducer, init);
  const [loadState, setLoadState] = useState(true);

  const logoutUser = async () => {
    try {
      const res = await fetch("/authenticate", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // const data = await res.json();

      if (res.status === 200) {
        dispatch({ type: "user", payload: true });
      } else {
        dispatch({ type: "user", payload: false });
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    logoutUser();

    setLoadState(false);
  }, []);

  return (
    <>
      {loadState ? (
        <MainLoading />
      ) : (
        <UserAuth.Provider value={{ state, dispatch }}>
          {/* <Navbar />
          <Navbar />
          <Navbar /> */}
          <Navbar />

          <Routing />
          <Footer />
        </UserAuth.Provider>
      )}
    </>
  );
};

export default App;
export { UserAuth };
