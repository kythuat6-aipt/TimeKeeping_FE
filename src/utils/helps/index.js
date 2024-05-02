import { REACT_APP_SERVER_BASE_URL } from 'utils/constants/config'
import pages from 'pages';

const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const getServerBaseUrl = () => {
  if(REACT_APP_SERVER_BASE_URL && REACT_APP_SERVER_BASE_URL !== "null") {
    return REACT_APP_SERVER_BASE_URL
  }

  return null
}

export const getFullUrlStaticFile = (path) => {
  const server_url = getServerBaseUrl()
  let url = `${path}`.replace("_internal\\", "").replace("_internal/", "").replace('server\\', '').replace('server/', '')

  if (server_url) {
    url = `${REACT_APP_SERVER_BASE_URL}/` + url
  }

  return url
}

export const getRouterParams = (path, params) => {
  if (!isEmpty(params)) {
    Object.keys(params).forEach(key => {
      path = path.replace(`:${key}`, params[key])
    })
  }

  return path
}

export const convertQueryToString = (routerPath, query) => {
  if (typeof query === 'object' && !isEmpty(query)) {
    const querys = [];
    Object.keys(query).forEach(key => {
      querys.push(`${key}=${query[key]}`)
    });
    return `${routerPath}?${querys.join('&')}`
  }
  if (typeof query === 'string') {
    return `${routerPath}${query}`
  }
  return routerPath
};

export const findPageByPath = (currentPath, pages = []) => {
  const page = pages.find(page => {
    const path = new RegExp("^" + page.path.replace(/:[^/]+/g, "([^/]+)") + "$")
    return path.test(currentPath)
  })
  return page
}

export const findChildByName = (name) => {
  return pages.filter(page => page?.parent === name).map(page => ({
    key: page?.name,
    icon: page?.icon,
    label: page?.label,
  }))
}

export const formatCurrency = (number) => {
  let s = parseInt(number)
  s = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(s)  
  // s = s.replace('₫', 'VNĐ')
  return s 
}