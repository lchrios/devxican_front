import React from 'react';
import { Layout, Breadcrumb, List, Avatar, Button, Row, Col, Comment, Form, Input, Divider } from 'antd';

const { Content } = Layout;

export const QuestionDetails = () => {

    const data = {
          title: 'Ayuda con pregunta de arreglos para entrevista!',
          description: 'Tengo este programa en C que ordena 100000 números aleatorios mediante el algoritmo de Merge Sort pero no me hace el ordenamiento y no escribe en el archivo resultado2.txt. El archivo resultado3.txt son los 100000 números aleatorios. Podrían ayudarme a ver mis errores y las posibles soluciones, de antemano , muchas gracias. El siguiente código es el main del programa, después del main viene la función del algoritmo de Merge Sort.',
          author: 'emamex98',
          date: '09-01-2020 13:00:00'
        };

    var date = new Date(data.date);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date = date.toLocaleDateString('es-MX', options);

    const { TextArea } = Input;
    const Editor = () => (
        <>
          <Form.Item>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Publicar respusta
            </Button>
          </Form.Item>
        </>
    );

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
                            <h5>Publicado por <a>{data.author}</a> el {date.toString()}</h5>

                            <br/>

                            <p>{data.description}</p>

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

                            <Button type='primary' size='large'>Publicar una pregunta</Button>
                            
                            <br/><br/>
                            
                            <p><a>Mis preguntas recientes</a></p>
                            <p><a>Mis respuestas recientes</a></p>
                            <p><a>Preguntas populares en la red</a></p>

                        </Col>

                    </Row>

                </div>

            </Content>
        </div>
    )
}