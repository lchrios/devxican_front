import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

import { Home } from './components/Home';
import { QuestionDetails } from './components/QuestionDetails';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

export const App = (props) => {
  return (
    <div className="App">
      <Layout style={{height:"100vh"}}>
        <Header>
          <div className="logo" style={{color: "white"}}>
            Devxican
          </div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">Inicio</Menu.Item>
            <Menu.Item key="2">Foros</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Router>
            <Switch>
              <Route path="/pregunta/:id">
                <QuestionDetails />
              </Route>
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
