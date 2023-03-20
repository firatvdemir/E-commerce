import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


function Register() {
    const[userInputs, setUserInputs] = useState({
        username:'',
        email: '',
        password:'',
        confirmPassword:'',
    });
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setUserInputs({
            ...userInputs,
            [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            body: JSON.stringify({
                userInputs: userInputs,
            })
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === false) {
                alert(result.message)
            } else if(result.status === true) {
                setIsLoggedIn({
                    ...isLoggedIn,
                    'status': result.status,
                    'username': result.username,
                });
                alert(`Welcome ${result.username}`);
                navigate('/');
            };
        });
    }

    return (
        <Container fluid>
            <Row>
                <Col md={6}>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label className='addPostLabel'>Username</Form.Label>
                        <Form.Control type='text' name='username' value={userInputs.username} onChange={HandleChange} placeholder='...'/>
                        <br />
                        <Form.Label className='addPostLabel'>E-mail</Form.Label>
                        <Form.Control type='email' name='email' value={userInputs.email} onChange={HandleChange} placeholder='...' />
                        <br />
                        <Form.Label className='addPostLabel'>Password</Form.Label>
                        <Form.Control type='password' name='password' value={userInputs.password} onChange={HandleChange} placeholder='...' />
                        <br />
                        <Form.Label className='addPostLabel'>Confirm Password</Form.Label>
                        <Form.Control type='password' name='confirmPassword' value={userInputs.confirmPassword} onChange={HandleChange} placeholder='...' />
                        <br />
                        <Button variant='primary' type='submit' onClick={HandleSubmit}>Submit</Button>
                    </Form.Group>
                </Form>
                <div style={{height: "150px"}}/>
                <p> You have an account?, please go to <strong style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Login</strong> </p>
                </Col>
            </Row>
            <Row></Row>
        </Container>

    )
};
export default Register;