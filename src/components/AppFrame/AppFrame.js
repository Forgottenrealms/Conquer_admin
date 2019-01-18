import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import routes from "../../routes";
import "./AppFrame.less";

const { Header, Content, Sider } = Layout;

class AppFrame extends Component {
  handleMenuClick = ({ key }) => {
      const {
        history,
        match
      } = this.props
    history.push(`${match.path}${key}`)
  }
  render() {
    const {
      pathname
    } = this.props.location;
    // console.log(pathname)
    const defaultSelectedKeys = pathname.split("/").slice(2).join("/");

    // console.log(this.props.children);
    // 获取isMenu === true的路由
    const menus = routes.filter(item => item.isMenu === true);
    return (
      <Layout>
        <Header className="header">
          <div className="logo">Conquer管理系统</div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[`/${defaultSelectedKeys}`]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              onClick={this.handleMenuClick}
            >
              {menus.map(menu => {
                return (
                  <Menu.Item key={menu.path}>
                    <Icon type={menu.iconType} />
                    {menu.title}
                  </Menu.Item>
                );
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(AppFrame);
