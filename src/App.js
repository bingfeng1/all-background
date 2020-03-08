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


  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline">
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
