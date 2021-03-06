import React, { createElement, useState } from 'react';
import { Layout, Breadcrumb, Avatar, Button, Row, Col, Comment, Form, Input, Divider, Tooltip, Radio } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useAuth0 } from "@auth0/auth0-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LogoutButton } from './LogoutButton';

const { Content } = Layout;

const postEntry = (title, author, description, history) => {

  if(title === '' || description === ''){
    return;
  }

  fetch(process.env.REACT_APP_API_URL + '/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      "title" : title,
      "date" : new Date(),
      "author" : author,
      "description": description,
      "answers" : [],
      "likes" : 0,
      "dislikes"   : 0
    })
  })
  .then(response => response.json())
  .then(resp => {
    history.push("/pregunta/" + resp.insertedId);
  })
}

export const PostQuestion = () => {

  const { loginWithRedirect } = useAuth0();
  const [cookies, setCookie] = useCookies(['name', 'pic_src', 'email', 'isAuth']);

  if(cookies.isAuth === 'false'){
    loginWithRedirect();
  }

  const [value, setValue] = useState('');
  const [form, ] = useState();
  const [title, setTile] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  

  let history = useHistory();

  return (
      <div>

          <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Foros</Breadcrumb.Item>
              <Breadcrumb.Item>Nueva Pregunta</Breadcrumb.Item>
          </Breadcrumb>

          <Content style={{ padding: '0 50px' }}>

              <div className="site-layout-content" >

                  <Row>
                      <Col span={18}>

                      <Form
                        layout="vertical"
                        form={form}
                      >
                        <Form.Item label="Título">
                          <Input size="large" onChange={e => setTile(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Cuerpo">
                          <ReactQuill 
                            theme="snow" 
                            value={value} 
                            onChange={e => {
                              setValue(e)
                              setDescription(e)
                            }} 
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" onClick={() => {postEntry(title, cookies.name, description, history)}}>Publicar</Button>
                        </Form.Item>
                      </Form>

                      </Col>

                      <Col span={6} style={{ padding: '0 50px' }}>
                          
                        <span>

                            Hola, <b>{cookies.name}</b>

                            <br/><br/>                                    
                            <p><a>Mis preguntas recientes</a></p>
                            <p><a>Mis respuestas recientes</a></p>
                            <p><a>Preguntas populares en la red</a></p>

                            <LogoutButton />
                        </span>

                      </Col>

                  </Row>

              </div>

          </Content>
      </div>
  )
}