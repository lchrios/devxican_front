import React, { createElement, useEffect, useState } from 'react';
import { Layout, Breadcrumb, Avatar, Button, Row, Col, Comment, Form, Input, Divider, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";

const { Content } = Layout;

export const QuestionDetails = () => {

  const [data, setData] = useState();
  const [likes, setLikes] = useState(6);
  const [dislikes, setDislikes] = useState(2);
  const [action, setAction] = useState(null);
  const [date, setDate] = useState();

  let { id } = useParams();

  useEffect(() => {
    if (!data) {
      fetch('http://localhost:9999/questions/' + id)
        .then(response => response.json())
        .then(data => {
          setData(data[0]);
          var tmp_date = new Date(data[0].date);
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          setDate(tmp_date.toLocaleDateString('es-MX', options).toString());
        });
    }
  });

  const { TextArea } = Input;
  const Editor = () => (
    <>
      <Form.Item>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Publicar respuesta
          </Button>
      </Form.Item>
    </>
  );

  const actions = [
    <Tooltip key="comment-basic-like" title="Me gusta">
      <span>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action"> {likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="No me gusta">
      <span>
        {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action"> {dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Responder</span>,
  ];

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

                <p>{data.description}</p>

                <Divider />

                <h3>Respuestas</h3>

                <Comment
                  actions={actions}
                  author={<a>Han Solo</a>}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      We supply a series of design principles, practical patterns and high quality design
                      resources (Sketch and Axure), to help people create their product prototypes beautifully
                      and efficiently.
                                    </p>
                  }
                  datetime={<span>{date}</span>}
                />

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
                    <Editor
                    //onChange={this.handleChange}
                    //onSubmit={this.handleSubmit}
                    //submitting={submitting}
                    //value={value}
                    />
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