import { DashBoard, ArticleEdit, ArticleList } from "./pages";

const routes = [
  {
    path: "/dashboard",
    title: "仪表盘",
    component: DashBoard,
    iconType: "pie-chart",
    isMenu: true,
    exact: false
  },
  {
    path: "/article/list",
    title: "文章列表",
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
  }
];

export default routes;
