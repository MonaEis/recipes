import { Outlet } from "react-router";
import Navi from "./Navi";
import Footer from "./Footer";


const RecipesDetailsLayout = () => {
  return (
    <div>
        <Navi/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default RecipesDetailsLayout
