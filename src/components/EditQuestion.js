import React, { createElement, useState, useEffect } from 'react';
import { Layout, Breadcrumb, Avatar, Button, Row, Col, Comment, Form, Input, Divider, Tooltip, Radio } from 'antd';
import { useHistory, useParams, Redirect, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useAuth0 } from "@auth0/auth0-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LogoutButton } from './LogoutButton';

const { Content } = Layout;

const repostEntry = (questionId, title, description, date, author, history) => {
  fetch('http://localhost:9999/questions/' + questionId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      "title" : title,
      "description": description,
      "date" : date,
      "author" : author,
      "description": description,
      "answers" : [],
      "likes" : 0,
      "dislikes"   : 0
    })
  })
  .then(e => {
    history.push("/pregunta/" + questionId);
  });

  history.push("/pregunta/" + questionId);
}

export const EditQuestion = () => {

  const { loginWithRedirect } = useAuth0();
  const [cookies, setCookie] = useCookies(['name', 'pic_src', 'email', 'isAuth']);

  if(cookies.isAuth === 'false'){
    loginWithRedirect();
  }

  const [data, setData] = useState();
  const [date, setDate] = useState();
  const [value, setValue] = useState('');
  const [form, ] = useState();
  const [title, setTile] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (!data) {

      fetch('http://localhost:9999/questions/' + id)
      .then(response => response.json())
      .then(data => {
        setData(data[0]);
        var tmp_date = new Date(data[0].date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setDate(tmp_date.toLocaleDateString('es-MX', options).toString());
        setValue(data[0].description)
      });
    }
  });

  if(data && data.author !== cookies.name){
    return <Redirect to={'/pregunta/' + id} />
  }

  if(data) {
    return (
        <div>

            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Foros</Breadcrumb.Item>
                <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
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
                            <Input 
                              size="large" 
                              onChange={e => setTile(e.target.value)} 
                              defaultValue={data.title}
                            />
                          </Form.Item>
                          <Form.Item label="Cuerpo">
                            <ReactQuill 
                              theme="snow" 
                              defaultValue={data.description}
                              value={value} 
                              onChange={e => {
                                setValue(e)
                                setDescription(e)
                              }} 
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" onClick={() => {repostEntry(id, title, description, data.date, data.author, history)}}>Publicar</Button>
                          </Form.Item>
                        </Form>

                        </Col>

                        <Col span={6} style={{ padding: '0 50px' }}>
                            
                        <span>
                            
                            <Link to="/nueva">
                                <Button type='primary' size='large'>Publicar una pregunta</Button>
                            </Link>

                            <Divider />

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

  return "";

}
