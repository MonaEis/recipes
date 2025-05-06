import { NavLink } from "react-router";
import "../styles/navi.css";

const Navi = () => {
    return (
        <nav>
            <div className="color_stripe"></div>
            <div className="navi">
                <NavLink to="/">
                    <div className="logo">
                        <img
                            src="src/assets/img/loeffelgruen_logo.svg"
                            alt="Logo"
                        />
                        <h2>Löffelgrün</h2>
                    </div>
                </NavLink>
                <div className="links">
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/rezepte"}>Rezepte</NavLink>
                    <NavLink to={"/ueberuns"}>Über uns</NavLink>
                    <NavLink to={"/neuesrezept"}>Neues Rezept</NavLink>
                </div>
                <NavLink to={"/login"}>Login</NavLink>
            </div>
        </nav>
    );
};

export default Navi;
