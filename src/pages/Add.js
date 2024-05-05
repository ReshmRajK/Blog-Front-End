import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate} from 'react-router-dom'
import '../pages/Add.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPostApi } from '../service/allApi';

function Add() {

    const navigate = useNavigate()
    const [addPost, setAddPost] = useState({

        caption: '',
        author: '',
        category: '',
        desc: '',
        date: ''
    })

    const [image, setImage] = useState('')

    const setInputs = (e) => {
        const { name, value } = e.target
        setAddPost({ ...addPost, [name]: value })

    }
    // console.log(addPost);

    const imageChoose = (e) => {
        const { name, value } = e.target
        // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    // console.log(image);


    const handleAdd = async (e) => {
        
        e.preventDefault()
        const { caption, author, category, desc, date } = addPost

        if (localStorage.getItem("id")) {
            const id = localStorage.getItem("id")
            // console.log(id);  


            if (caption == '') {
                toast.error('Please enter caption', {
                    autoClose: 1000,
                })
            }
            else if (author == '') {
                toast.error('Please enter author name', {
                    autoClose: 1000,
                })
            }
            else if (category == '') {
                toast.error('Please enter category', {
                    autoClose: 1000,
                })
            }
            else if (desc == '') {
                toast.error('Please give description', {
                    autoClose: 1000,
                })
            }
            else if (date == '') {
                toast.error('Please choose date', {
                    autoClose: 1000,
                })
            }
            else if (image == '') {
                toast.error('Please choose image', {
                    autoClose: 1000,
                })
            }
            else {

                // toast.success('all fields are filled')          
                const headerConfig = {
                    "Content-Type": "multipart/form-data"
                }

                const data = new FormData()

                data.append("caption", caption)
                data.append("author", author)
                data.append("category", category)
                data.append("desc", desc)
                data.append("date", date)
                data.append("user_profile", image)

                const result = await addPostApi(id, data, headerConfig)
                if (result.status >= 200 && result.status < 300) {
                    setAddPost({
                        ...addPost,
                        caption: '',
                        author: '',
                        category: '',
                        desc: '',
                        date: ''
                    })
                    setImage('')
                    navigate('/home')
                }
               
            }
        }
        else{
            alert('Please login first')
            navigate('/')
        }

    }


    return (
        <div className='post_section'>
            <Container className='w-50 mb-5 add_content'>

                <h1 className='add_post_Section text-center'>Add Post</h1>
                <form action="" className='add_Details'>

                    <label htmlFor="inputTitle" className='mt-3'>Caption</label>
                    <input onChange={(e) => setInputs(e)} type="text" name="caption" id="inputTitle" className='form-control' placeholder='Enter Caption' />

                    <label htmlFor="inputAuthor" className='mt-3'>Author Name</label>
                    <input onChange={(e) => setInputs(e)} type="text" name="author" id="inputAuthor" className='form-control' placeholder='Enter Author Name' />

                    <label htmlFor="inputCategory" className='mt-3'>Category</label>
                    <select onChange={(e) => setInputs(e)} name="category" id="inputCategory" className='form-control'>
                        <option value={"select"}>Category</option>
                        <option value={"food"}>Food</option>
                        <option value={"travel"}>Travel</option>
                        <option value={"sports"}>Sports</option>
                        <option value={"technical"}>Technical</option>
                        <option value={"nature"}>Nature</option>
                        <option value={"fashion"}>Fashion</option>

                    </select>

                    <label htmlFor="inputDesc" className='mt-3'>Description</label>
                    <textarea onChange={(e) => setInputs(e)} name="desc" id="inputDesc" cols="30" rows="10" className='form-control' placeholder='Description'></textarea>

                    <label htmlFor="inputImage" className='mt-3'>Upload Image</label>
                    <input onChange={(e) => imageChoose(e)} type="file" name="profile" id="inputImage" className='form-control' />

                    <label htmlFor="inputDate" className='mt-3'>Submit Date</label>
                    <input onChange={(e) => setInputs(e)} type="date" name="date" id="inputDate" className='form-control' />

                    <div className='d-flex justify-content-center mt-5 '>
                        <Button onClick={(e) => handleAdd(e)} className='add_button'>Add</Button>
                    </div>
                </form>
            </Container>

            <ToastContainer />
        </div>
    )
}

export default Add