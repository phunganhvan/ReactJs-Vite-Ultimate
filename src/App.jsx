import Header from "./components/layout/header/header"
import Footer from "./components/layout/footer/footer"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { getAccountAPI } from "./services/api.services"
import { useContext } from "react"
import { AuthContext } from "./components/context/auth.context"
import { Spin } from "antd"
const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  const fetchUserInfo = async () => {
    // setIsAppLoading(true);
    const res = await getAccountAPI();
    if (res.data) {
      console.log("res account: ", res.data);
      setUser(res.data.user);
      setIsAppLoading(false);
    }
  }
  useEffect(() => {
    fetchUserInfo();
  }, [isAppLoading])


  return (
    <>
      {isAppLoading === true ? 
        <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
          <Spin />
        </div>
      :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>}
    </>
  )
}

export default App
