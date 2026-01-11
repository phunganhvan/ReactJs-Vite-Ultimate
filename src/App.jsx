import Header from "./components/layout/header/header"
import Footer from "./components/layout/footer/footer"
import { Outlet } from "react-router-dom"
const App = () => {



  return (
    <>
      <Header />
      <Outlet />
      <Footer />

    </>
  )
}

export default App
