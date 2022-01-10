import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import GetIssues from "./getIssues";
import GetOneIssue from "./getOneIssue";
import UserIssues from "./userIssues";
import PostIssue from "./postIssue";
import Register from "./register";
import Login from "./login";
import UnknownPage from "./unknownpage";
import "../styles/App.css";
import { AuthProvider } from "./auth";
import AuthRoute from "./authRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="main">
            <Routes>
              <Route exact path="/" element={<GetIssues />}></Route>
              <Route exact path="/GetIssues" element={<GetIssues />}></Route>
              <Route path="/GetOneIssue" element={<GetOneIssue />}></Route>
              <Route path="/PostIssue" element={<AuthRoute />}>
                <Route path="" element={<PostIssue />} />
              </Route>
              <Route path="/UserIssues" element={<AuthRoute />}>
                <Route path="" element={<UserIssues />} />
              </Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="*" element={<UnknownPage />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
