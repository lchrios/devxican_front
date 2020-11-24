import React, { createElement, useEffect, useState } from 'react';
import { Layout, Breadcrumb, Avatar, Button, Row, Col, Comment, Form, Input, Divider, Tooltip, Popconfirm, message } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useParams, Link, useHistory, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

const { Content } = Layout;

const postComment = (questionId, author, description) => {

  if(description === ''){
    return;
  }

  fetch(process.env.REACT_APP_API_URL + '/questions/' + questionId + '/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      "date" : new Date(),
      "author" : author,
      "comment": description,
      "answers" : [],
      "likes" : 0,
      "dislikes"   : 0
    })
  })
  .then(resp => {
    window.location.reload();
  })
}

const deleteEntry = (questionId) => {
  fetch(process.env.REACT_APP_API_URL + '/questions/' + questionId, {
    method: 'DELETE'
  })
  .then(() => {
    window.location.replace('/');
  })
}

const deleteComment = (questionId, commentId) => {
  fetch(process.env.REACT_APP_API_URL + '/questions/' + questionId + '/comments/' + commentId, {
    method: 'DELETE'
  })
  .then(() => {
    window.location.reload();
  })
}


export const QuestionDetails = () => {

  const [data, setData] = useState();
  const [likes, setLikes] = useState(20);
  const [dislikes, setDislikes] = useState(10);
  const [action, setAction] = useState(null);
  const [date, setDate] = useState();
  const [form, ] = useState();
  const [comment, setComment] = useState();
  const [responses, setResponses] = useState([]);
  const [cookies, setCookie] = useCookies(['name', 'pic_src', 'email', 'isAuth']);

  const { TextArea } = Input;

  let { id } = useParams();
  let history = useHistory();

  var comments = [];

  useEffect(() => {
    if (!data) {

      fetch(process.env.REACT_APP_API_URL + '/questions/' + id)
        .then(response => response.json())
        .then(data => {

          setData(data[0]);

          var tmp_date = new Date(data[0].date);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          setDate(tmp_date.toLocaleDateString('es-MX', options).toString());

          if(data[0].answers){
            for(var i=0; i< data[0].answers.length; i++){
              console.log(data[0].answers[i].author)
              comments.push(
                <Comment
                  actions={[
                    <Tooltip key="comment-basic-like" title="Me gusta" >
                      <span>
                        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                        <span className="comment-action"> {data[0].answers[i].likes}</span>
                      </span>
                    </Tooltip>,
                    <Tooltip key="comment-basic-dislike" title="No me gusta">
                      <span>
                        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                        <span className="comment-action"> {data[0].answers[i].dislikes}</span>
                      </span>
                    </Tooltip>,
                    <Tooltip key="comment-basic-edit" title="Editar">
                      {cookies.name === data[0].answers[i].author &&
                        <span>
                          {createElement(action === '' ? EditFilled : EditOutlined)}
                        </span>
                      }
                    </Tooltip>,
                    <Tooltip key="comment-basic-delete" title="Borrar">
                      {cookies.name === data[0].answers[i].author &&
                        <span>
                          <Popconfirm
                            title="¿En verdad deseas borrar esta pregunta?"
                            onConfirm={() => {deleteComment(id, data[0].answers[i].id)}}
                            okText="Sí"
                            cancelText="No"
                          >
                            {createElement(action === '' ? DeleteFilled : DeleteOutlined)}
                          </Popconfirm>
                        </span>
                      }
                    </Tooltip>
                  ]}
                  author={data[0].answers[i].author}
                  avatar={
                    <Avatar
                      src={process.env.REACT_APP_APP_URL + "avatar.png"}
                      alt="Han Solo"
                    />
                  }
                  content={data[0].answers[i].comment}
                  datetime={<span>{data[0].answers.date}</span>}
                />
              );
            }
            setResponses(comments);
          }
        });
    }
  });

  if (data) {
    return (
      <div>

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Foros</Breadcrumb.Item>
          <Breadcrumb.Item>Preguntas de Entrevista</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ padding: '0 50px' }}>

          <div className="site-layout-content" >

            <Row>
              <Col span={18}>

                <h2>{data.title}</h2>
                <h5>Publicado por <a>{data.author}</a> el {date}</h5>

                <br />
              
                <div dangerouslySetInnerHTML={{ __html: data.description }} />

                {cookies.name === data.author && 
                  <div align="right">
                    <Divider />
                    <Link to={"/editar/" + id}>
                      <Button>Editar</Button>
                    </Link>&nbsp;&nbsp;
                    <Popconfirm
                      title="¿En verdad deseas borrar esta pregunta?"
                      onConfirm={() => {deleteEntry(id)}}
                      okText="Sí"
                      cancelText="No"
                    >
                      <Button danger>Eliminar</Button>
                    </Popconfirm>
                  </div>
                }
                <Divider />

                <h3>Respuestas</h3>
                {responses}

                {cookies.isAuth === 'true' &&
                  <>
                  <Divider />

                  <h3>Responder</h3>

                  <Comment
                    avatar={
                      <Avatar
                        src={process.env.REACT_APP_APP_URL + "avatar.png"}
                        alt="Han Solo"
                      />
                    }
                    content={
                      <Form form={form}>
                        <Form.Item>
                          <TextArea 
                            rows={4} 
                            onChange={e => setComment(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button 
                            htmlType="submit" 
                            type="primary" 
                            onClick={() => {
                              postComment(id, cookies.name, comment)
                            }}
                          >
                            Publicar respuesta
                            </Button>
                        </Form.Item>
                      </Form>
                    }
                  />
                  </>
                }

              </Col>

              <Col span={6} style={{ padding: '0 50px' }}>

              { cookies.isAuth === 'true' && 
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
              }

              { cookies.isAuth === 'false' && 
                  <span>
                      <h3>Únete a la conversación</h3>
                      <LoginButton />
                  </span>
              
              }

              </Col>

            </Row>

          </div>

        </Content>
      </div>
    )
  } else {
    return ("")
  }

}