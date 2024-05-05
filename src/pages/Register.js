import React, { useEffect, useState } from 'react'
import '../pages/Register.css'
import { Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegisterApi } from '../service/allApi';


function Register() {

    const navigate = useNavigate()

    const [regInputs, setRegInputs] = useState({
        uname: '',
        mobile: '',
        email: '',
        psw: '',
        cpsw: ''
    })

    const [nameValid, setNameValid] = useState(true)
    const [mobileValid, setMobileValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)
    const [pswValid, setPswValid] = useState(true)
    const [cpswValid, setCpswValid] = useState(true)



    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);


    const setInputs = (e) => {
        const { name, value } = e.target
        // console.log(name,value);
        if (name == 'uname') {

            if (value.match(/^[a-zA-Z ]+$/)) {
                setNameValid(true)
                setRegInputs({ ...regInputs, [name]: value })
            }
            else {
                setNameValid(false)
            }
        }

        if (name == 'mobile') {
            if (value.match(/^[+][0-9]{10,12}$/)) {
                setMobileValid(true)
                setRegInputs({ ...regInputs, [name]: value })
            }
            else {
                setMobileValid(false)
            }
        }

        if (name == 'email') {
            if (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                setEmailValid(true)
                setRegInputs({ ...regInputs, [name]: value })
            }
            else {
                setEmailValid(false)
            }
        }

        if (name == 'psw' ) {
            if (value.match(/^[a-zA-Z0-9]+$/)) {
                setPswValid(true)
                setRegInputs({ ...regInputs, [name]: value })
            }
            else {
                setPswValid(false)
            }
        }


        if (name == 'cpsw') {
            if (value.match(regInputs.psw)) {
                setCpswValid(true)
                setRegInputs({ ...regInputs, [name]: value })

            }
            else {
                setCpswValid(false)
            }
        }

    }

    // console.log(regInputs);

    const handleRegister = async () => {
        const { uname, mobile, email, psw, cpsw } = regInputs

        if (uname == '') {
            toast.error('Please enter user name',{
                autoClose: 1000,
            })
        }
        else if (mobile == '') {
            toast.error('Please enter contact number',{
                autoClose: 1000,
            })
        }
        else if (email == '') {
            toast.error('Please enter email',{
                autoClose: 1000,
            })
        }
        else if (psw == '') {
            toast.error('Please enter password',{
                autoClose: 1000,
            })
        }
        else if(cpsw==''){
            toast.error("Please enter confirm password",{
                autoClose: 1000,
            })
        }

        else {
            const result = await userRegisterApi(regInputs)
            // console.log(result.data);
            if (result.status >= 200 && result.status < 300) {
                navigate('/login')
            }

        }

    }



    return (
        <div style={{ height: '100vh' }} className='bg-black d-flex justify-content-center align-items-center register_section'>
            <Container data-aos="flip-up" className='w-50  p-5 bg-white register_content'>

                <h1 className='signUp-Section text-center'>SighUp Form</h1>
                <form action="" className='form_details'>
                    <label htmlFor="inputName" className='mt-3 form_title'>Name :</label>
                    <input onChange={(e) => setInputs(e)} type="text" name="uname" id="inputName" className='form-control' placeholder='Enter Name' />

                    {
                        !nameValid &&
                        <div>
                            <p className='text-danger'>*Accepts characters only</p>
                        </div>
                    }

                    <label htmlFor="inputNumber" className='mt-3 form_title'>Mobile :</label>
                    <input onChange={(e) => setInputs(e)} type="text" name="mobile" id="inputNumber" className='form-control' placeholder='Contact Number' />

                    {

                        !mobileValid &&
                        <div>
                            <p className='text-danger'>*Accepts numbers only</p>
                        </div>
                    }

                    <label htmlFor="inputEmail" className='mt-3 form_title'>Email :</label>
                    <input onChange={(e) => setInputs(e)} type="text" name="email" id="inputEmail" className='form-control' placeholder='Enter Email' />

                    {
                        !emailValid &&
                        <div>
                            <p className='text-danger'>*Accepts characters,numbers,special characters only</p>
                        </div>
                    }

                    <label htmlFor="inputPsw" className='mt-3 form_title'>Password :</label>
                    <input onChange={(e) => setInputs(e)} type="password" name="psw" id="inputPsw" className='form-control' placeholder='Password' />

                    {
                        !pswValid &&
                        <div>
                            <p className='text-danger'>*Accepts characters and numbers only</p>
                        </div>
                    }

                    <label htmlFor="inputCpsw" className='mt-3 form_title'>Confirm Password :</label>
                        <input onChange={(e) => setInputs(e)} type="password" name="cpsw" id="inputCpsw" className='form-control' placeholder='Confirm Password' />

                        {
                            !cpswValid &&
                            <div>
                                <p className='text-danger'>*Password doesn't match</p>
                            </div>
                        }

                    <div className='d-flex justify-content-center mt-5 '>
                        <Button onClick={handleRegister} className='signup_button'>SignUp</Button>
                    </div>

                </form>
            </Container>

            <ToastContainer />

        </div>
    )


}

export default Register