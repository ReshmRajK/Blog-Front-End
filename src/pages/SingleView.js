import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePostApi, singlePostApi } from '../service/allApi';
import { baseUrl } from '../service/baseUrl';


function SingleView() {

    const [singlePost, setSinglePost] = useState({})

    const { _id } = useParams()
    // console.log(_id);

    const navigate = useNavigate()

    const singleViewPost = async () => {
        const result = await singlePostApi(_id)
        if (result.status >= 200 && result.status < 300) {
            // console.log(result.data);
            setSinglePost(result.data)
        }
    }

    useEffect(() => {
        singleViewPost()

    }, [])


    return (
        <div className=' bg-black'>
            <Navbar className="bg-white">

                <Container>
                    <Navbar.Brand onClick={()=>navigate('/home')} href="" style={{ color: 'green', fontFamily: 'Playfair Display, serif', fontSize: '3rem' }} >BLOG</Navbar.Brand>
                </Container>
            </Navbar>

            <Container className='w-75'>
                <Row className='mt-5'>
                    <Col lg={12} className='mt-5'>
                        <img src={`${baseUrl}/uploads/${singlePost.profile}`} alt="" style={{ width: '100%', height: '400px', border: '5px solid green' }} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className='mt-5 mb-5'>

                        <div className='d-flex justify-content-between' style={{ color: 'green', fontFamily: "Croissant One, serif" }}>
                            <h1>{singlePost.caption}</h1>
                            <h1>{singlePost.author}</h1>
                        </div>

                        <p className='mt-3 text-white' style={{ fontFamily: 'Playfair Display, serif', fontSize: '25px' }}>{singlePost.desc}</p>

                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default SingleView