import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import '../pages/Login.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pswResetApi, userLoginApi } from '../service/allApi';
import Modal from 'react-bootstrap/Modal';

function Login() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate()

    const [loginInputs, setLoginInputs] = useState({
        email: '',
        psw: ''
    })

    const [emailValid, setEmailValid] = useState(true)
    const [pswValid, setPswValid] = useState(true)

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);


    const setInputs = (e) => {
        const { name, value } = e.target
        // setLoginInputs({ ...loginInputs, [name]: value })

        if (name == 'email') {
            if (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                setEmailValid(true)
                setLoginInputs({ ...loginInputs, [name]: value })
            }
            else {
                setEmailValid(false)
            }
        }

        if (name == 'psw') {
            if (value.match(/^[a-zA-Z0-9]+$/)) {
                setPswValid(true)
                setLoginInputs({ ...loginInputs, [name]: value })
            }
            else {
                setPswValid(false)
            }
        }

    }

    // console.log(loginInputs);

    const handleLogin = async () => {

        const { email, psw } = loginInputs

        if (email == '') {
            toast.error('Please enter email')
        }
        else if (psw == '') {
            toast.error('Please enter password')
        }
        else {
            const result = await userLoginApi(loginInputs)
            // console.log(data);
            if (result.status >= 200 && result.status < 300) {

                navigate('/home')
                localStorage.setItem("id", result.data.id)

            }
            else {
                toast(result.response.data, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }

        }

    }


    //code for update password
    const [updatePsw,setUpdatePsw]=useState(true)
    const [cpswValid, setCpswValid] = useState(true)

    const [resetPsw, setResetPsw] = useState({
        psw: '',
        cpsw: ''

    })

    const setPsw = (e) => {
        const { name, value } = e.target
        if(name=='psw'){
            if (value.match(/^[a-zA-Z0-9]+$/)) {
                setUpdatePsw(true)
                setResetPsw({ ...resetPsw, [name]: value })
            }
            else {
                setUpdatePsw(false)
            }
        }
       if(name=='cpsw'){
        if(value.match(resetPsw.psw)){
            setCpswValid(true)
            setResetPsw({ ...resetPsw, [name]: value })
        }
        else{
            setCpswValid(false)
        }
       }
    }

    const pswReset = async () => {
        const { psw, cpsw } = resetPsw
       if(psw==cpsw){
        if (localStorage.getItem('id')) {
            let id = localStorage.getItem('id')
            const { data } = await pswResetApi(id, resetPsw)
            console.log(data);
            if (data.status >= 200 && data.status < 300) {
                handleShow(false)
            }
        }
        else{
            toast.error("Couldn't identify your account..!",{
                autoClose: 1000,
            })
        }

       }
        else{
            toast.error("Password doesn't match",{
                autoClose: 1000,
            })
        }
    }

    return (
        <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center bg-black'>
            <Container data-aos="flip-right">
                <Row>
                    <Col lg={6} >
                        <img src="https://i.postimg.cc/y8VShrys/jump-hello-transparent.gif" alt="" style={{ width: '100%', height: '350px' }} />
                    </Col>

                    <Col lg={6} >
                        <h1 className='text-center form_title'>SignUp Form</h1>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3 mt-5">
                            <Form.Control onChange={(e) => setInputs(e)} type="email" name="email" placeholder="name@example.com" />
                        </FloatingLabel>

                        {
                            !emailValid &&
                            <div>
                                <p className='text-danger'>*Accepts Correct Format</p>
                            </div>
                        }

                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control onChange={(e) => setInputs(e)} name='psw' type="password" placeholder="Password" />
                        </FloatingLabel>

                        {
                            !pswValid &&
                            <div>
                                <p className='text-danger'>*Accepts Correct Format</p>
                            </div>
                        }

                        <p onClick={() => navigate('/register')} className='mt-3 text-white text-center' style={{ cursor: 'pointer' }}>
                            don't have an account <a>Create account</a> </p>

                        {/* <p onClick={handleShow} className='text-center mt-3 text-success'>Forgot password</p> */}

                        <div className='d-flex justify-content-center mt-3'>
                            <Button onClick={handleLogin} className='button_section'>Login</Button>
                        </div>
                    </Col>
                </Row>

            </Container>
            <ToastContainer />


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <FloatingLabel controlId="floatingPassword" label="New Password">
                        <Form.Control onChange={(e) => setPsw(e)} name='psw' type="password" placeholder="Password" />
                    </FloatingLabel>

                    {
                        !updatePsw &&
                        <div>
                            <p className='text-danger'>*Accepts characters and numbers only</p>
                        </div>
                    }

                    <FloatingLabel className='mt-3' controlId="floatingConPassword" label="Confirm Password">
                        <Form.Control onChange={(e) => setPsw(e)} name='cpsw' type="password" placeholder="Password" />
                    </FloatingLabel>

                    {
                            !cpswValid &&
                            <div>
                                <p className='text-danger'>*Password doesn't match</p>
                            </div>
                        }

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={pswReset}>Update</Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Login