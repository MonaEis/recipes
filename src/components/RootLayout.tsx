import { Outlet } from "react-router";
import Navi from "./Navi";
import Footer from "./Footer";
import Header from "./Header";


const RootLayout = () => {
  return (
    <div>
        <Navi/>
        {/* <Header/> */}
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default RootLayout
