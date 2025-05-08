import { Link, NavLink } from "react-router";
import "../styles/login_status.css";
import { useAuthContext } from "../context/auth-context";

const LoginStatus = () => {
    const { session, signOut } = useAuthContext();



    return (
        <section className="login_status">
            {!session && 
            <Link to="/login">
                <div className="login_btn">Login</div>
            </Link>
            }
            {session && 
            <div className="logged_in">
                <div className="login_btn" onClick={signOut}>Logout</div>
                <NavLink to="/login" >Du bist angemeldet</NavLink>

            </div>
            }
        </section>
    );
};

export default LoginStatus;
