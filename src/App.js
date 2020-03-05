import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import MenuList from './components/App/Menu'
import Routes from './routers'
import AppHeader from './components/App/Header';


const { Header, Footer, Sider, Content } = Layout;

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
          <Content style={{padding:"20px"}}>
            {
              Routes
            }
            <Redirect to="/blog/articles/addupdate"/>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
