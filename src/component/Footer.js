import React, { useEffect } from 'react'
import '../component/Footer.css'
import { Col, Container, Row } from 'react-bootstrap'
import AOS from "aos";
import "aos/dist/aos.css";

function Footer() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className='mb-2'>

      <Container>
        <Row >
          <h1 className='text-center text-success mt-3'>Contact us</h1>

          <Col lg={6} data-aos="flip-down">
            <p className='text-center text-warning mt-2 social_medias'>About</p>
            <p id='content'>Blogging is a great way to show your talents and interests to prospective employers,
              while adding an edge to your resume. If you blog consistently it shows your dedication,
              passions and creativity all of which are key attributes employers look for in job candidates.</p>
          </Col>

          <Col lg={6} data-aos="flip-down">

            <p className='text-center text-warning social_medias mt-3'>Social Medias</p>
            <div data-aos="flip-down" className='d-flex justify-content-center gap-5 text-success mt-4'>
              <i class="fa-brands fa-facebook fa-fade fa-2x"></i>
              <i class="fa-brands fa-instagram fa-fade fa-2x"></i>
              <i class="fa-brands fa-whatsapp fa-fade fa-2x"></i>
              <i class="fa-brands fa-twitter fa-fade fa-2x"></i>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer