import React, { useEffect, useState } from 'react';
import { Layout, List, Avatar, Button, Row, Col } from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";

const { Content } = Layout;

export const Home = () => {

    const [data, setData] = useState();
    
    useEffect(() => {
        if(!data) {
            fetch('http://localhost:9999/questions')
            .then(response => response.json())
            .then(data => setData(data));
        }
    });
    

    return (
        <div>

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
                                    actions={[<a key="list-loadmore-edit" href={'/pregunta/' + item._id} >Ver pregunta</a>]}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<a href={'/pregunta/' + item._id}>{item.title}</a>}
                                    description={item.description.replace(/<\/?[^>]+(>|$)/g, "")}
                                    />
                                </List.Item>
                                )}
                            />

                        </Col>

                        <Col span={6} style={{ padding: '0 50px' }}>

                            <Link to="/nueva">
                                <Button type='primary' size='large'>Publicar una pregunta</Button>
                            </Link>

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