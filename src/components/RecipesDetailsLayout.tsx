// import { Outlet } from "react-router";
import Navi from "./Navi";
import Footer from "./Footer";
import RezeptDetailPage from "../pages/RezeptDetailPage";


const RecipesDetailsLayout = () => {
  return (
    <div>
        <Navi/>
      <main>
        <RezeptDetailPage/>
      </main>
      <Footer/>
    </div>
  )
}

export default RecipesDetailsLayout
