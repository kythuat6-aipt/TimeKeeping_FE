// imports page
import HistoryTime from "./historyTime";
import HomePage from "./home";
import LoginPage from "./login";
import {
  UsergroupAddOutlined,
  FolderOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";

/** pages
 * page hiển thị trên menu thi có thêm 2 thuộc tính icon và label
 * page không hiển thị trên menu bỏ icon và lable
 */

const pages = [

  {
    name: "login",
    path: "/login",
    auth: false,
    element: <LoginPage />,
  },

  {
    name: "home",
    path: "/",
    auth: true,
    label: "Chấm công",
    element: <HomePage />,
    icon: <IssuesCloseOutlined />,
  },

  {
    name: "historyTime",
    path: "/historyTime",
    auth: true,
    label: "Lịch sử",
    element: <HistoryTime />,
    icon: <IssuesCloseOutlined />,
  },



];

export default pages;
