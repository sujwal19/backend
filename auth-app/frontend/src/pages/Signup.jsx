import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Signup</h1>

        <span>
          Already have an account?
          <Link to="/login">
            <span className="side-btn"> Login </span>
          </Link>
        </span>
      </div>

      <form action="" className="form">
        <input type="text" name="name" autoFocus placeholder="Name" />

        <input type="email" name="email" placeholder="Email" />

        <input type="password" name="password" placeholder="Password" />
        <button>Signup</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
