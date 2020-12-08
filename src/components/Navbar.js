import React from "react";
import { useSelector } from "react-redux";
// import { selectToken, selectUser } from "../../store/user/selectors";
import { Link } from "react-router-dom";
import { selectToken, selectUser } from "../store/user/selectors";
// import { logOut } from "../../store/user/actions";

const Navbar = () => {
  //   const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  //   const history = useHistory();

  return (
    <nav>
      <div>
        <Link to="/developersSnippets">Developers Snippets</Link>
        <span> | </span>
        <Link to="/developersLinks">Developers Links</Link>
        <span> | </span>
        <Link style={{ color: "black", textDecoration: "none" }} to="/">
          Welcome to Developers DashBoard
        </Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <span> | </span>
            <Link to="/signUp">Sign Up</Link>
          </>
        ) : (
          <>
            <span> | </span>
            <span>Hello, {user.name}</span>
            <button
            //   onClick={() => {
            //     history.push("/login");
            //     dispatch(logOut());
            //   }}
            >
              logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
