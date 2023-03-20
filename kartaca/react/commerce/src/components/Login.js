import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {
    const[loginInputs, setLoginInputs] = useState({
        username:'',
        password:'',
    });

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const[passwordCheck, setpasswordCheck] = useState(false);
    const navigate = useNavigate();

    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setLoginInputs({
            ...loginInputs,
            [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/login', {
            method:'POST',
            body: JSON.stringify({
                loginInputs: loginInputs,
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            setIsLoggedIn({
                ...isLoggedIn,
                'status': result.status,
                'username': result.username,
            })
            result.status ? navigate(`/`) : setpasswordCheck(true)
        });
    };

    return(
        <Container fluid>
            <Row>
                <Col md={6}>
                    {passwordCheck &&
                    <h3>Wrong Password or Username!</h3>}

                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label className='addPostLabel'>Username</Form.Label>
                                <Form.Control type='text' name='username' value={loginInputs.username} onChange={HandleChange} placeholder='...' />
                                <br />
                                <Form.Label className='addPostLabel'>Password</Form.Label>
                                <Form.Control type='password' name='password' value={loginInputs.password} onChange={HandleChange} placeholder='...' />
                                <br />
                                <Button variant="primary" type="submit" onClick={HandleSubmit}> Submit </Button>
                            </Form.Group>
                        </Form>
                    <div style={{height: "400px"}}/>
                    <p> If you don't have an account, please go to <strong style={{cursor: 'pointer'}} onClick={() => navigate('/register')}>Register</strong> </p>
                </Col>
            </Row>
            <Row></Row>
        </Container>
    )
};

export default Login;