import { useEffect, useMemo, useCallback, useState} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { actionGetUserProfileByToken } from "pages/login/actions"
import { findPageByPath } from "utils/helps"
import { useDispatch } from "react-redux"
import { AIPT_WEB_TOKEN } from "./utils/constants/config"
import { Layout } from "antd"
import navigatePage from "utils/helps/navigate"
import pages from "pages"
import Cookies from "js-cookie"
import PageContent from "routes"
import socketIO from "./utils/service/socketIO"

import {
  AppHeader,
  AppSider,
  AppFooter
} from "./components"

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  window.navigatePage = (name, params = {}, query = {}) => navigatePage(navigate, name, params, query)
  const token = Cookies.get(AIPT_WEB_TOKEN)
  const currentPath = useLocation().pathname
  const [isMobileView, setIsMobileView] = useState(window.innerWidth > 576)

  const isPublicPage = useMemo(() => {
    const page = findPageByPath(currentPath, pages)
    return !page?.auth
  }, [currentPath])
  
  const handleCheckNavigate = useCallback(() => {
    const paths = pages.map(page => page.path)
    if (!paths.includes(currentPath)) {
      window.location.href = '/'
    }
  }, [currentPath])

  // check navigate
  handleCheckNavigate()

  useEffect(() => {
    if (token) {
      socketIO.emit('join', token)
      actionGetUserProfileByToken(dispatch)
    }
    else if (!isPublicPage) {
      window.navigatePage('login')
    }
  }, [token])

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth > 576)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Layout hasSider id="app">
      {!isPublicPage && <AppSider />}

      <Layout>
        {!isPublicPage && <AppHeader />}
        {isMobileView ? (
              <div style={{fontSize:"large",fontWeight:"bold",textAlign:"center",padding:"20px"}}>Hãy sử dụng trên điện thoại!</div>
            ) : (
              <PageContent />
            )}
        {!isPublicPage && <AppFooter />}
      </Layout>
    </Layout>
  )
}
export default App