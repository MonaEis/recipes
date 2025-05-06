import { NavLink } from "react-router";
import "../styles/navi.css";

const Navi = () => {
    return (
        <nav>
            <div className="color_stripe"></div>
            <div className="navi">
                <a href="/">
                    <div className="logo">
                        <img
                            src="src/assets/img/loeffelgruen_logo.svg"
                            alt="Logo"
                        />
                        <h2>Löffelgrün</h2>
                    </div>
                </a>
                <div className="links">
                    <NavLink className="active_link" to={"/"}>Home</NavLink>
                    <NavLink className="active_link" to={"/rezepte"}>Rezepte</NavLink>
                    <NavLink className="active_link" to={"/ueberuns"}>Über uns</NavLink>
                    <NavLink className="active_link" to={"/neuesrezept"}>Neues Rezept</NavLink>
                </div>
                <NavLink className="active_link" to={"/login"}>Login</NavLink>
            </div>
        </nav>
    );
};

export default Navi;
