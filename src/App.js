import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import MenuList from './components/App/Menu'
import Routes from './routers'
import AppHeader from './components/App/Header';
import Footer from './components/App/Footer';


const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false)

  // 获取当前url。为了刷新后左侧列表依然在所展示的项目中
  let location = document.location.hash.split('#')
  let subMenuArr = () => {
    // 将路由分段
    let tempArr = location[1]?.split('/') ?? []
    let result = []
    for (let i = 1; i < tempArr.length; i++) {
      // 数组第一个是空，所以从第二个开始遍历
      if (i !== 1) {
        // 将数组中的路由依次增加
        result.push(`${result[i - 2]}/${tempArr[i]}`)
      } else {
        result.push(`/${tempArr[i]}`)
      }
    }
    return result
  }

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu
            theme="dark"
            defaultOpenKeys={subMenuArr()}
            defaultSelectedKeys={[location[1]]}
            mode="inline">
            {
              MenuList
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <AppHeader></AppHeader>
          </Header>
          <Content style={{ padding: "20px" }}>
            {
              Routes
            }
            <Route to="/" />
          </Content>
          <footer>
            <Footer />
          </footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
