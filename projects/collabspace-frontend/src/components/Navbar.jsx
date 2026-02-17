import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      {user ? (
        <>
          <span>{user.name}</span>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
