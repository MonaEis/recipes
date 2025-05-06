import { Outlet } from "react-router"
import Header from "./Header"

const StandardHeaderLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default StandardHeaderLayout
