import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import '../pages/Home.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { viewAllPostApi, addLike, addLikeApi } from '../service/allApi';
import { baseUrl } from '../service/baseUrl';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function Home() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const [allPost, setAllPost] = useState([])
    const [searchData, setSearchData] = useState('')
    const [likes, setLikes] = useState(0)

    const viewAllPost = async () => {
        const result = await viewAllPostApi(searchData)
        // console.log(result.data);
        setAllPost(result.data)
    }
    // console.log(allPost);

    useEffect(() => {
        AOS.init();
        AOS.refresh();
        viewAllPost()
    }, [searchData, likes]);

    // console.log(searchData);

    const likeAdd = async (id) => {
        if(localStorage.getItem("id")){
            var uId =localStorage.getItem("id")

            const result = await addLikeApi(id,{uId})
            setLikes(result.data);
        }
    }

    return (

        <div>
            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-white mb-3 ">
                    <Container fluid>
                        <Navbar.Brand data-aos="fade-down-left" onClick={() => navigate('/')} href="" className='text-success title ms-5'>Blog</Navbar.Brand>
                        <Navbar.Toggle className='me-5' aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='menu_item text-success' id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    My Blog
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">

                                    <NavDropdown
                                        title="post" className='post_menu menu_item'
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item onClick={() => navigate('/add')} href="" className='text-primary menu_item'>Add</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate(`/my-blog-view`)} href="" className='text-primary menu_item'>My Blog</NavDropdown.Item>
                                    </NavDropdown>

                                </Nav>


                                <Form className="d-flex">
                                    <Form.Control
                                        onChange={(e) => setSearchData(e.target.value)} name='search' id='search1'
                                        type="search"
                                        placeholder="Search"
                                        className="me-2 menu_item"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success" className='text-dark search_item'>Search</Button>
                                </Form>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

            <div style={{ backgroundColor: 'black' }} className='home_section'>
                <Container data-aos="fade-up-left">
                    {
                        allPost.length > 0 ? allPost.map(i => (
                            <Row>
                                <Col lg={6} className='mt-5'>
                                   <img onClick={() => navigate(`/single_view/${i._id}`)} src={`${baseUrl}/uploads/${i.profile}`} alt="" style={{ width: '100%', height: '300px' }} className='image_section' />
                                </Col>

                                <Col lg={6}>

                                    <div className='d-flex justify-content-between mt-5 ' style={{ color: 'green' }}>
                                        <h1 className='ms-5'>{i.caption.length > 15 ? i.caption.slice(0, 15) + "..." : i.caption}</h1>
                                        <h1 className='me-5'>{i.author}</h1>

                                    </div>

                                    <p className='blog_content text-white mt-3'>{i.desc.length > 300 ? i.desc.slice(0, 300) + " " : i.desc}</p>

                                    <p className='mt-3' style={{ color: 'green', fontSize: '15px' }}>{i.date}</p>

                                    <div className='d-flex justify-content-between'>

                                        <i className="fa-solid fa-heart ms-5 fa-2x text-warning" onClick={() => likeAdd(i._id)}>
                                            <b style={{ fontSize: '12px', color: 'green' }}>{i.likes}</b>
                                        </i>

                                    </div>

                                </Col>

                            </Row>


                        )) : <h1>No Post Yet</h1>
                    }

                </Container>
            </div>

            <Modal show={show} onHide={handleClose} style={{ fontFamily: 'Croissant One, serif' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Comment here...!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel rows={4} cols={40}
                        controlId="floatingTextarea"
                        label="Comments"
                        className="mb-3"
                    >
                        <Form.Control as="textarea" placeholder="Leave a comment here" />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleClose}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home