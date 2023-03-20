import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function AddPost() {
    const {isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const[postInputs, setPostInputs] = useState({
        username: isLoggedIn.username,
        header: '',
        description: '',
        startingPrice: 0,
        imageUrl: '',
    });
    const navigate = useNavigate();

    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setPostInputs({
            ...postInputs,
            [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/addPost', {
            method:'POST',
            body: JSON.stringify({
                postInputs: postInputs,
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
        });
        navigate('/')
    };

    return(
        <Container fluid>
            <Row>
                <Col md={6}>
                    <Form>
                        <Form.Group className='mb-3' size='lg'>
                            <Form.Label className='addPostLabel'>Header</Form.Label>
                            <Form.Control type='text' name='header' value={postInputs.header} onChange={HandleChange}/>
                            <br/>
                            <Form.Label className='addPostLabel'>Starting Price($)</Form.Label>
                            <Form.Control type='number' name='startingPrice' value={postInputs.startingPrice} onChange={HandleChange} />
                            <br/>
                            <Form.Label className='addPostLabel'>Image URL</Form.Label>
                            <Form.Control type='url' name='imageUrl' value={postInputs.imageUrl} onChange={HandleChange} />
                            <br/>
                            <Form.Label className='addPostLabel'> Description </Form.Label>
                            <Form.Control as="textarea" rows={5} name='description' value={postInputs.description} onChange={HandleChange} />
                            <br/>
                            <Button variant='primary' type='submit' onClick={HandleSubmit}>Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default AddPost;