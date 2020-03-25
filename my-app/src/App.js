import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
//import { UserOutlined, LaptopOutlined, NotificationOutlined } from 'ant-design/icons';
import "./App.css";
import { Link } from "react-router-dom";
import Routing from "./rout/link";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class App extends React.Component {
  
render() {
  return (
    <Layout >
      
    <Header className="header">
      <Menu
        
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key><Link to="/">Home</Link></Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={230} >
        <Menu
          mode="inline"
          className="site-layout-background"
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
          
            key="sub1"
            title={
              <span>
                
                Root Of Equation
              </span>
            }
          >
            <Menu.Item key="1"><Link to="/bisection">Bisection Method</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/Falseposition">False-Position Method</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/onepoint">OnePoint-Iteration Method</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/Newton">Newton-Raphson Method</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/secant">Secant Method</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                
                System Of Linear Equation
              </span>
            }
          >
            <Menu.Item key="6">Cramer's Rule</Menu.Item>
            <Menu.Item key="7">Gauss Elimination Method</Menu.Item>
            <Menu.Item key="8">Gauss Jordan Method</Menu.Item>
            <Menu.Item key="9">LU Decomposition Method</Menu.Item>
            <Menu.Item key="10">Jacobi Iteration Method</Menu.Item>
            <Menu.Item key="11">Gauss Seidel Method</Menu.Item>
            <Menu.Item key="12">Conjugate Gradient Method</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                
                Interpolation
              </span>
            }
          >
            <Menu.Item key="13">Newton's Devided-Diff</Menu.Item>
            <Menu.Item key="14">Lagrange Polynomials</Menu.Item>
            <Menu.Item key="15">Spline Interpolation</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          
        </Breadcrumb>
        <Content
          className="background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Routing />
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}
}
export default App;