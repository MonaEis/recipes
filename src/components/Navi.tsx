import { Link, NavLink } from "react-router";
import "../styles/navi.css";
import logoImg from "../assets/img/loeffelgruen_logo.svg";
import LoginStatus from "./LoginStatus";
import { useAuthContext } from "../context/auth-context";
import profilIcon from "../assets/img/profil_icon.png";
const Navi = () => {
    const { session } = useAuthContext();
    return (
        <nav id="start">
            <div className="color_stripe"></div>
            <div className="navi">
                <a href="/">
                    <div className="logo">
                        <img src={logoImg} alt="Logo" />
                        <h2>Löffelgrün</h2>
                    </div>
                </a>
                <div className="links">
                    <NavLink className="active_link" to={"/"}>
                        Home
                    </NavLink>
                    {session && (
                        <NavLink className="active_link" to={"/rezepte"}>
                            Rezepte
                        </NavLink>
                    )}
                    <NavLink className="active_link" to={"/ueberuns"}>
                        Über uns
                    </NavLink>
                    {session && (<> 
                        <NavLink className="active_link" to={"/neuesrezept"}>
                            Neues Rezept
                        </NavLink>
                        <NavLink className="active_link" to={"/meine_rezepte"}>
                            Meine Rezepte
                        </NavLink>
                    </>
                    )}
                </div>
                <div className="rechts">
                    {session && (
                        <Link to="/profil">
                            <div className="profil_icon">
                                <img src={profilIcon} alt="Profil Icon" />
                            </div>
                        </Link>
                    )}
                    <LoginStatus />
                </div>
            </div>
        </nav>
    );
};

export default Navi;
