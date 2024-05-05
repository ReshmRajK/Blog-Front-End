import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { baseUrl } from '../service/baseUrl'
import AOS from "aos";
import "aos/dist/aos.css";


function FilterPost({ postArray }) {
    useEffect(()=>{
        AOS.init();
        AOS.refresh();
    },[])

    return (
        <div className='mt-5'>
            <Container className='mt-5'>
                {
                    postArray.length > 0 ? postArray.map(i => (
                        <Row>
                            <Col lg={6} data-aos="fade-right">
                                <img src={`${baseUrl}/uploads/${i.profile}`} alt="" style={{ width: '100%', height: '250px' }} />
                            </Col>

                            <Col lg={6} data-aos="fade-left">

                                <div className='d-flex justify-content-between' style={{color:'green'}}>
                                    <h1 style={{fontFamily:'Croissant One, serif'}}>{i.caption.length>10?i.caption.slice(0,15)+"...":i.caption}</h1>
                                    <h1>{i.author}</h1>
                                </div>

                                <p>{i.desc.length>150?i.desc.slice(0,150)+"...":i.desc}</p>
                            </Col>
                        </Row>
                    )) : 
                    <div className='d-flex justify-content-center mt-5'>
                    <i className="fa-solid fa-spinner fa-spin fa-5x text-success"></i>
                    </div>
                }

            </Container>
        </div>
    )
}

export default FilterPost