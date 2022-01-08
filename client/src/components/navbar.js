import { Link } from "react-router-dom";

const Navbar = (props) => {
  return props.token === "" ? (
    <nav className="navbar">
      <Link to="/">
        <h1>Climate Action 101</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/getIssues">Issues</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  ) : (
    <nav className="navbar">
      <Link to="/">
        <h1>Climate Action 101</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/getIssues">Issues</Link>
        <Link to="/postIssues">Add Issue</Link>
        <Link to="/" onClick={() => props.handleToken("")}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
