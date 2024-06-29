import { Route, Routes } from "react-router-dom"
import { isEmpty } from "utils/helps"
import pages from 'pages'

const PageContent = ({ userLogin }) => {
  return (
    <Routes>
      {pages.filter(page => !isEmpty(userLogin) ? page : !page?.auth)
        .map((page, index) =>
          <Route key={index} path={page.path} element={page.element} />
        )}
    </Routes>
  )
}

export default PageContent