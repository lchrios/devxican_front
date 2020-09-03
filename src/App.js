import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from './components/Home';
import { Layout, Menu, Breadcrumb } from 'antd';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

export const App = (props) => {
  return (
    <div className="App">
      <Layout>
        <Header>
          <div className="logo" style={{color: "white"}}>
            Devxican
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Foros</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Router>
            <Switch>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </Content>
        <Footer><a>Términos y Condiciones</a> | <a>Política de Privacidad</a> | <a>Aviso Legal</a></Footer>
      </Layout>
      
    </div>
  );
}
