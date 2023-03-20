import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function PostDetail() {
    const { postId } = useParams();
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
    const[postInfo, setPostInfo] = useState([]);
    const[postBids, setPostBids] = useState([]);
    const[maxBid, setMaxBid] = useState(undefined);
    const[bidInputs, setBidInputs] = useState({
        username: isLoggedIn.username === undefined ? '' : isLoggedIn.username,
        postId: postId,
        bidValue: '',
    });

    // fetching the post info via post id
    useEffect( () => {
        fetch(`http://127.0.0.1:8000/${postId}`, {
            method:'GET',
        })
        .then(response => response.json())
        .then(result => {
            setPostInfo(result);
            setMaxBid(parseFloat(result[0].price));
        })
    },[]);

    // fetching the post bids via post id
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/bids/${postId}`,{
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {
            if(result.length > 0 ) {
                setPostBids(result);
                if(result[0].bidValue !== undefined) {
                    setMaxBid(parseFloat(result[0].bidValue));
                };
            };
        });
    },[maxBid])

    const HandleChange = (e) => {
        let key = e.target.name;
        let value = e.target.value;
        setBidInputs({
            ...bidInputs,
            [key]: value
        });
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        if(bidInputs.bidValue > maxBid) {
            fetch('http://127.0.0.1:8000/bids/add-bid', {
                method: 'POST',
                body: JSON.stringify({
                    bidInputs: bidInputs,
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            });
        } else {
            alert(`Bid value must higher than $${maxBid}!`)
        };

        setMaxBid(bidInputs.bidValue);
    };

    let highestBidList = postBids.map(bid => (
        <li key={bid.id}>
            ${bid.bidValue} by {bid.username}
        </li>
    ))

    let postSection = postInfo.map((post) => {

        return(
            <>
            <Row>
                <Col> <div style={{height: '30px'}}></div></Col>
            </Row>
            <Row key={post.id}>
                <Col md={6}> <h2 style={{float:'left' }}> {post.header} </h2></Col>
                <Col md={6}> <h3> Starting Price: ${post.price} </h3></Col>
            </Row>
            <Row>
                <Col md={6}> <img alt='postImg'src={post.imageUrl} style={{width:'100%', float:'left', borderStyle:'solid', borderWidth: '2px', borderRadius: '15px',  }}/> </Col>
                <Col md={6} >
                    <p>{post.description} </p>
                    {maxBid !== undefined &&
                        <>
                        <h2>Highest 5 Bids</h2>
                        <ol>{highestBidList}</ol>
                        </>
                    }
                    {isLoggedIn.status &&
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type='number' name='bidValue' value={bidInputs.bidValue} onChange={HandleChange} placeholder='Place a Bid' min={maxBid}/>
                                <br />
                                <Button variant="primary" type="submit" onClick={HandleSubmit}> Submit </Button>
                            </Form.Group>
                        </Form>
                    }
                </Col>
            </Row>
            </>
        )
    });

    return (
        <Container fluid>
            {postSection}
        </Container>
    )
};

export default PostDetail;