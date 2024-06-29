import { useEffect, useMemo, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { actionGetUserProfileByToken } from "pages/login/actions"
import { findPageByPath, isEmpty } from "utils/helps"
import { useDispatch, useSelector } from "react-redux"
import { AIPT_WEB_TOKEN } from "./utils/constants/config"
import socketIO from "./utils/service/socketIO"
import navigatePage from "utils/helps/navigate"
import PageContent from "routes"
import Cookies from "js-cookie"
import { Layout } from "antd"
import pages from "pages"

const App = () => {
  // redux and profile user login
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state?.profile)
  const token = Cookies.get(AIPT_WEB_TOKEN)
  
  // navigate
  const navigate = useNavigate();
  window.navigatePage = (name, params = {}, query = {}) => navigatePage(navigate, name, params, query)
  
  // check is mobile view
  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 576)
  
  // get current page
  const { pathname } = useLocation()
  
  const currentPage = useMemo(() => {
    return findPageByPath(pathname, pages)
  }, [pathname])

  // handle resize
  const handleResize = () => {
    setIsMobileView(window.innerWidth > 576)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // common
  useEffect(() => {
    if (!isEmpty(userLogin)) {
      socketIO.emit("join", token)
    }
    else if (!isEmpty(token)) {
      actionGetUserProfileByToken(dispatch)
    }
    else if (currentPage?.auth) {
      window.navigatePage("login")
    }
  }, [userLogin])

  return (
    <Layout id="app">
      <PageContent userLogin={userLogin} />
    </Layout>
  )
}
export default App