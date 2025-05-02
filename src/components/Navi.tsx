import { Link, NavLink } from "react-router"
import "../styles/navi.css"

const Navi = () => {
  return (
    <nav>
        <div className="color_stripe"></div>
        <div>
            <div>
                <img src="src/assets/img/loeffelgruen_logo.svg" alt="Logo" />
                <h2>Löffelgrün</h2>
            </div>
            <div>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/rezepte"}>Rezepte</NavLink>
                <NavLink to={"/ueberuns"}>Über uns</NavLink>
            </div>
            <NavLink to={"/login"}>Login</NavLink>
        </div>
      
    </nav>
  )
}

export default Navi
