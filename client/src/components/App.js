import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Home from "./home";
// import GetItems from "./getItems";
// import PostItems from "./postItems";
import Register from "./register";
import Login from "./login";
import UnknownPage from "./unknownpage";
import { Component } from "react";
import "../styles/App.css";

class App extends Component {
  state = {
    token: "",
  };

  componentDidMount() {
    if (!localStorage.getItem("Token")) {
      localStorage.setItem("Token", this.state.token);
    }

    const token = localStorage.getItem("Token");
    if (token !== "") {
      this.setState({ token: token });
    } else {
      this.setState({ token: "" });
    }
  }
  componentDidUpdate() {
    localStorage.setItem("Token", this.state.token);
  }

  handleToken = (data) => {
    this.setState({ token: data });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar token={this.state.token} handleToken={this.handleToken} />
          <div className="main">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              {/* <Route
                path="/GetItems"
                element={
                  this.state.token === "" ? (
                    <Navigate to="/login" />
                  ) : (
                    <GetItems />
                  )
                }
              >
                <Route path=":id" element={<GetItems />}></Route>
              </Route>
              <Route
                path="/PostItems"
                element={
                  this.state.token === "" ? (
                    <Navigate to="/login" />
                  ) : (
                    <PostItems />
                  )
                }
              ></Route> */}
              <Route
                path="/Login"
                element={<Login handleToken={this.handleToken} />}
              ></Route>
              <Route
                path="/Register"
                element={<Register handleToken={this.handleToken} />}
              ></Route>
              <Route path="*" element={<UnknownPage />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
