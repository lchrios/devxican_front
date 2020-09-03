import React from 'react';
import { Layout, Breadcrumb, List, Avatar, Button, Skeleton, Row, Col } from 'antd';

const { Content } = Layout;

export const Home = () => {
    
    //const { initLoading, loading } = this.state;

    const data = [
        {
          title: '¿Cómo validar para que solo puedan ingresar datos flotantes?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget lacus eu tellus pharetra auctor. Nulla maximus aliquam nunc. Donec dictum hendrerit nisl, non tempor urna laoreet fringilla.'
        },
        {
          title: '¿Cómo puedo obtener la información de un Stream?',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget lacus eu tellus pharetra auctor. Nulla maximus aliquam nunc. Donec dictum hendrerit nisl, non tempor urna laoreet fringilla.'
        },
        {
          title: 'Regresión lineal simple con JavaScript TensorFlow',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget lacus eu tellus pharetra auctor. Nulla maximus aliquam nunc. Donec dictum hendrerit nisl, non tempor urna laoreet fringilla.'
        },
        {
          title: 'Ayuda con pregunta de arreglos para entrevista!',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget lacus eu tellus pharetra auctor. Nulla maximus aliquam nunc. Donec dictum hendrerit nisl, non tempor urna laoreet fringilla.'
        },
      ];

    return (
        <div>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb> */}

            <Content style={{ padding: '0 50px' }}>

                <div className="site-layout-content" >

                <h2>Preguntas recientes</h2>

                    <Row>

                        <Col span={18}>

                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                <List.Item
                                    actions={[<a key="list-loadmore-edit">Ver pregunta</a>]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a>{item.title}</a>}
                                    description={item.description}
                                    />
                                </List.Item>
                                )}
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