// imports page
import HomePage from "./home";
import LoginPage from "./login";

import { IssuesCloseOutlined } from "@ant-design/icons";

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
];

export default pages;
