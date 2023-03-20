import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MainPage() {
    const[postInputs, setPostInputs] = useState([]);
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            setPostInputs(result);
        });
    }, []);

    const HandleClick = (itemId) => {

        if(isLoggedIn.status){
            navigate(`/${itemId}`)
        } else {
            navigate('/login')
        };
    };

    let postCard = postInputs.map((item) => (
        <Col xs={12} md={6} lg={4} key={item.id}>
            <Card className='postCard' >
                <Card.Img className='postCardImg' src={item.imageUrl} />
                <Card.Body>
                <Card.Title> <h4>{item.header.substr(0, 19)}...</h4> </Card.Title>
                <hr/>
                <Card.Subtitle> Starting Price: <strong> ${parseFloat(item.price)} </strong> </Card.Subtitle>
                <br />
                <Card.Text> {item.description.substr(0, 79)}... </Card.Text>
                </Card.Body>

                <Card.Footer>
                    <Button
                    variant="primary"
                    onClick={ ()=>HandleClick(item.id) } >Click for details...</Button>
                </Card.Footer>
            </Card>
        </Col>
    ));

    return (
        <Container >
            <Row>
                <br/>
            </Row>
            <Row>
                {postCard}
            </Row>
        </Container>
    )
};

export default MainPage;