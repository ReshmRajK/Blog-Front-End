import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import '../component/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import { filterPostApi } from '../service/allApi';
import FilterPost from '../pages/FilterPost';


function Header() {

    const navigate = useNavigate()
    const [post,setPost]=useState([])

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);


    const handleLogOut = () => {
        localStorage.removeItem("id")
    }

    const filterPost=async(data)=>{
        const result=await filterPostApi(data)
        // console.log(result.data);
        setPost(result.data)

    }
    // console.log(post);


    return (
        <div >

            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-white mb-3 ">
                    <Container fluid>
                        <i class="fa-solid fa-blog fa-spin fa-spin-reverse fa-3x me-3 text-success ms-5"></i>
                        <Navbar.Brand data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" href="" className='text-success title'>
                            Blog</Navbar.Brand>
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


                                    <Nav.Link onClick={() => navigate('/home')} href='' className='text-primary menu_item me-5'>Home</Nav.Link>

                                    <Nav.Link onClick={() => navigate('/login')} href="" className='text-primary menu_item me-5'>Login</Nav.Link>
                                    <Nav.Link onClick={() => navigate('/register')} href="" className='text-primary menu_item me-5'>Register</Nav.Link>

                                </Nav>

                                <Nav className="justify-content-end flex-grow-1 pe-3 me-5">
                                    <Nav.Link onClick={handleLogOut} href="" className='text-primary menu_item'>LogOut</Nav.Link>
                                </Nav>

                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

            <div id='body-section'>
                <div className='d-flex justify-content-center align-items-center'>

                </div>
                <h1 className='text-center text-white mt-5'>Experience Has Taught Well</h1>
                {/* <h1 className='text-center text-white mt-5'>Let Me List Them Out For You</h1> */}

                <p className='text-center container mt-5' style={{ color: 'green' }}>It’s the little things in life that make the biggest impact.
                    But sometimes, it’s hard to know where to start. But you can start today with blogging.
                    Blogging is to write what extreme sports are to athletics more free-form, more accident-prone,
                    less formal, more alive.</p>
            </div>

            <div className='bg-black category_section'>
                <h1 className='text-center text-warning'>Category</h1>
                <div className='d-flex justify-content-center flex-wrap gap-3 mt-5'>

                    <Card onClick={()=>filterPost('food')} data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://i.postimg.cc/rsSgc92Y/food.webp" style={{ width: '100%', height: '200px' }} />
                        <Card.Body  className='text-center menu_item' style={{ height: '3rem' }}>
                            <Card.Title  className='text-success '>Food</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card onClick={()=>filterPost('travel')}  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://i.postimg.cc/DZhP6XXr/travel.jpg" style={{ width: '100%', height: '200px' }} />
                        <Card.Body className='text-center menu_item' style={{ height: '3rem' }}>
                            <Card.Title  className='text-success '>Travel</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card onClick={()=>filterPost('sports')} data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://i.postimg.cc/fTQS9NYd/sports.jpg" style={{ width: '100%', height: '200px' }} />
                        <Card.Body  className='text-center menu_item' style={{ height: '3rem' }}>
                            <Card.Title  className='text-success '>Sports</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

                <div className='d-flex justify-content-center flex-wrap gap-3 mt-3 mb-5'>

                    <Card  onClick={()=>filterPost('fashion')} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://i.postimg.cc/mDrNKGmk/fashion-1024x682.jpg" style={{ width: '100%', height: '200px' }} />
                        <Card.Body className='text-center menu_item' style={{ height: '3rem' }}>
                            <Card.Title  className='text-success '>Fashion</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card onClick={()=>filterPost('technical')} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="https://i.postimg.cc/HWcwH9Ck/technology1.jpg" style={{ width: '100%', height: '200px' }} />
                        <Card.Body  className='text-center menu_item' style={{ height: '3rem' }}>
                            <Card.Title  className='text-success '>Technology</Card.Title>
                        </Card.Body>
                    </Card>

                    {/* <Link to={'/filter-post'}> */}

                    <Card onClick={()=>filterPost('nature')} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" style={{ width: '18rem' }} >
                        <Card.Img variant="top" src="https://i.postimg.cc/T3ft546V/nature.jpg" style={{ width: '100%', height: '200px' }} />
                        <Card.Body  className='text-center menu_item' style={{ height: '3rem' }}>
                            <Card.Title  className='text-success '>Nature</Card.Title>
                        </Card.Body>
                    </Card>

                    {/* </Link> */}

                </div>
                <FilterPost postArray={post} />

            </div>

        </div>
    )
}

export default Header