import { Outlet } from "react-router";
import Navi from "./Navi";
import Footer from "./Footer";


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
