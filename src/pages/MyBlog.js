import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { addPostApi, deletePostApi, viewMyBlogApi } from '../service/allApi'
import { baseUrl } from '../service/baseUrl'
// import Alert from 'react-bootstrap/Alert';







function MyBlog() {
  const [myBlogData, setMyBlogData] = useState([])

  const navigate = useNavigate()


  const myBlog = async () => {
    if (localStorage.getItem('id')) {
      let id = localStorage.getItem('id')
      // console.log(id);
      const result = await viewMyBlogApi(id)
      // console.log(result.data);
      setMyBlogData(result.data)
    }

  }
  // console.log(myBlogData);


  const deletePost = async (id) => {
    const result = await deletePostApi(id)
    // console.log(result);
    if (result.status >= 200 && result.status < 300) {
      setMyBlogData(result.data)
      // alert(result.data)
      navigate('/home')
    }
  }


  useEffect(() => {
    myBlog()

  }, [])



  return (
    <div style={{height:'100vh', backgroundColor: 'green' }} className='d-flex justify-content-center '>
    
      <Container className='mt-5'>
        {
          myBlogData.length > 0 ? myBlogData.map(item => (
            <Row>
              <Col lg={6}>

                <div className='d-flex justify-content-between text-white'>
                  <h1>{item.caption}</h1>
                  <h1>{item.author}</h1>
                </div>
                <p className='text- mt-3' style={{ fontFamily: 'Playfair Display, serif', fontSize: '25px', lineHeight: '2.5rem' }}>{item.desc}</p>
                <p className='mt-3'>{item.date}</p>

              </Col>

              <Col lg={6}>
                <img src={`${baseUrl}/uploads/${item.profile}`}
                  alt="" style={{ width: '100%', height: '350px' }}  onClick={()=>navigate('/home')}/>

                <div className='d-flex justify-content-between mb-5 mt-5'>
                  <i onClick={()=>navigate(`/edit/${item._id}`)} className="fa-solid fa-pencil fa-3x ms-5" style={{ color: 'blue' }}></i>
                  <i onClick={() => deletePost(item._id)} className="fa-solid fa-trash-can fa-3x  me-5" style={{ color: 'red' }}></i>
                </div>
              </Col>
            </Row>

          )) :<div>
             <h1 className='text-center mt-5 text-white'>Blog Is Not Posted Yet...!</h1>
                <p className='text-center mt-5'>
                  <i className="fa-regular fa-face-sad-tear fa-beat-fade fa-2x text-warning"></i>
                  </p>
                  
                  <p onClick={()=>navigate('/home')} className='text-center mt-5'>
                  <i className="fa-solid fa-arrow-left fa-beat-fade text-white me-3"></i>
                    <a  className='text-white' href="" style={{textDecoration:'none',fontFamily:'Croissant One, serif'}}>Back To Home</a>
                    </p>  

             </div>
        }

      </Container>



     
    </div>
  )
}

export default MyBlog





