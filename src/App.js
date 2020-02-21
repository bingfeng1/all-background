import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import MenuList from './components/App/Menu'
import Routes from './routers'


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
          <Header>Header</Header>
          <Content>
            {
              Routes
            }
            <Redirect to="/"/>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
