import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/MainPage';
import Register from './components/Register';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import Logout from './components/Logout';
import AddPost from './components/AddPost';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';

export const UserContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState({
    'status': false,
    'username': 'unknown',
  });

  const value = {isLoggedIn, setIsLoggedIn};

  return (
    <div className="App">
      <UserContext.Provider value={value} >
        <Container fluid>
          <Row className='justify-content-md-center'>
            <Col xs ={12} md={10}>
              <Navbar className='navBar' bg="dark" variant="dark">
                <Col >
                  <Nav className="me-auto">
                      <Link to='/'>
                        <Button className='navButton' variant="outline-secondary">Home</Button>
                      </Link>

                      {!(isLoggedIn.status) && <Link to='/login'>
                        <Button className='navButton' variant="outline-secondary">Login</Button>
                      </Link> }

                      {!(isLoggedIn.status) && <Link to='/register'>
                        <Button className='navButton' variant="outline-secondary">Register</Button>
                      </Link>}

                      {isLoggedIn.status && <Link to='/addpost'>
                        <Button className='navButton' variant='outline-secondary'>Add Post</Button>
                       </Link>}

                       {isLoggedIn.status && <Link to='/logout'>
                          <Button className='navButton' variant="outline-secondary">Logout</Button>
                        </Link>}
                  </Nav>
                </Col>
                <Col >
                {isLoggedIn.status && <strong className='navBarMessage' > {isLoggedIn.username} </strong> }
                </Col>
                <Col >
                  <h4 className='navBarMessage'> E-commerce App!</h4>
                </Col>
              </Navbar>
            </Col>
          </Row>

          <Row className='justify-content-md-center'></Row>

          <Row className='justify-content-md-center'>
            <Col xs={12} md={10}>
              <Routes>
                <Route path='/' element={ <MainPage />} />
                <Route path='/register' element={ <Register />} />
                <Route path='/login' element={ <Login />} />
                <Route path='/logout' element={ <Logout /> } />
                <Route path='/:postId' element={ <PostDetail /> } />
                <Route path='/addpost' element={ <AddPost /> } />
              </Routes>
            </Col>
          </Row>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;
