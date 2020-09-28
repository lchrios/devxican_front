import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

import { Home } from './components/Home';
import { QuestionDetails } from './components/QuestionDetails';
import { PostQuestion } from './components/PostQuestion';
import { Profile } from './components/Profile';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;

export const App = (props) => {
  return (
    <div className="App">
      <Router>
      <Layout>
        <Header>
          <div className="logo">
            <Link to="/" style={{color: "white", fontWeight: "bold"}}>Devxican</Link>
          </div>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Inicio</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/foros">Foros</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          
            <Switch>
              <Route path="/pregunta/:id">
                <QuestionDetails />
              </Route>
              <Route path="/nueva">
                <PostQuestion />
              </Route>
              <Route path="/perfil">
                <Profile />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              
            </Switch>
          
        </Content>
        <Footer><a>Términos y Condiciones</a> | <a>Política de Privacidad</a> | <a>Aviso Legal</a></Footer>
      </Layout>
      </Router>
    </div>
  );
}
