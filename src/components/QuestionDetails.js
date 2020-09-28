import React, { createElement, useEffect, useState } from 'react';
import { Layout, Breadcrumb, Avatar, Button, Row, Col, Comment, Form, Input, Divider, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { BrowserRouter as Router, useParams, Link, useHistory } from "react-router-dom";

const { Content } = Layout;

const postComment = (questionId, author, description, useForceUpdate) => {
  fetch('http://localhost:9999/questions/' + questionId + '/comments', {
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


export const QuestionDetails = () => {

  const [data, setData] = useState();
  const [likes, setLikes] = useState(10);
  const [dislikes, setDislikes] = useState(5);
  const [action, setAction] = useState(null);
  const [date, setDate] = useState();
  const [form, ] = useState();
  const [comment, setComment] = useState();
  const [responses, setResponses] = useState([]);

  const useForceUpdate = () => useState()[1];

  let { id } = useParams();
  let history = useHistory();

  const { TextArea } = Input;

  var comments = [];


  useEffect(() => {
    if (!data) {

      fetch('http://localhost:9999/questions/' + id)
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
                    <Tooltip key="comment-basic-like" title="Me gusta">
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
                    <span key="comment-basic-reply-to">Responder</span>,
                  ]}
                  author={data[0].answers[i].author}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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

                <Divider />

                <h3>Respuestas</h3>
                {responses}

                <Divider />

                <h3>Responder</h3>

                <Comment
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
                            postComment(id, 'test', comment, useForceUpdate)
                          }}
                        >
                          Publicar respuesta
                          </Button>
                      </Form.Item>
                    </Form>
                  }
                />

              </Col>

              <Col span={6} style={{ padding: '0 50px' }}>

                <Link to="/nueva">
                    <Button type='primary' size='large'>Publicar una pregunta</Button>
                </Link>

                <br /><br />

                <p><a>Mis preguntas recientes</a></p>
                <p><a>Mis respuestas recientes</a></p>
                <p><a>Preguntas populares en la red</a></p>

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