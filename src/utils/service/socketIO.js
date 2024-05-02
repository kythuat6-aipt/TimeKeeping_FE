import { AIPT_WEB_TOKEN } from 'utils/constants/config'
import { getServerBaseUrl } from "utils/helps"
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie"
import { message } from 'antd'

const token = Cookies.get(AIPT_WEB_TOKEN)

const config = {
  uri: getServerBaseUrl(),
  opts: {
    extraHeaders: {
      "Authorization": `${token}`
    }
  }
}

const socketIO = socketIOClient(config.uri, config.opts)

socketIO.on('message', (data) => {
  const { msg, status } = data

  if (status === 200) {
    message.success(msg)
  } 
  else {
    message.error(msg)
  }
})

export default socketIO