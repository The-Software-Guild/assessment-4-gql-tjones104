import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./navbar";
import GetIssues from "./getIssues";
import GetOneIssue from "./getOneIssue";
import UserIssues from "./userIssues";
import PostIssue from "./postIssue";
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
              <Route exact path="/" element={<GetIssues />}></Route>
              <Route exact path="/GetIssues" element={<GetIssues />}></Route>
              <Route path="/GetOneIssue" element={<GetOneIssue />}></Route>
              <Route
                path="/PostIssue"
                element={
                  this.state.token === "" ? (
                    <Navigate to="/login" />
                  ) : (
                    <PostIssue handleToken={this.handleToken} />
                  )
                }
              ></Route>
              <Route
                path="/UserIssues"
                element={
                  this.state.token === "" ? (
                    <Navigate to="/login" />
                  ) : (
                    <UserIssues handleToken={this.handleToken} />
                  )
                }
              ></Route>
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
