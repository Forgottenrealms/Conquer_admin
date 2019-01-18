import { DashBoard, ArticleEdit, ArticleList, DataEdit, DataTables, DataDetails } from "./pages";

const routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    component: DashBoard,
    iconType: "home",
    isMenu: true,
    exact: false
  },
  {
    path: "/article/list",
    title: "ArticleList",
    component: ArticleList,
    iconType: "desktop",
    isMenu: true,
    exact: false
  },
  {
    path: "/article/edit/:id",
    title: "文章编辑",
    component: ArticleEdit,
    isMenu: false,
    exact: false
  },
  {
    path: "/data/tables",
    title: "Data Tables",
    component: DataTables,
    iconType: "table",
    isMenu: true,
    exact: false
  },
  {
    path: "/data/edit/:id",
    title: "数据编辑",
    component: DataEdit,
    isMenu: false,
    exact: false
  },
  {
    path: "/data/details/:id",
    title: "数据详情",
    component: DataDetails,
    isMenu: false,
    exact: false
  }
];

export default routes;
