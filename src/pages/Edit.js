import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Button, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { editPostApi, singlePostApi } from '../service/allApi';
import '../pages/Add.css'
import AOS from "aos";
import "aos/dist/aos.css";

function Edit() {

    const navigate = useNavigate()
    const [addPost, setAddPost] = useState({

        caption: '',
        author: '',
        category: '',
        desc: '',
        date: ''
    })

    const [image, setImage] = useState('')
    const { _id } = useParams()

    const editPost = async () => {
        const result = await singlePostApi(_id)
        setAddPost(result.data)

    }
    // console.log(addPost);

    useEffect(() => {
        editPost()
        AOS.init();
        AOS.refresh();
    }, [])


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


    const handleUpdate = async (e) => {

        e.preventDefault()
        const { caption, author, category, desc, date } = addPost

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

        else {

            const headerConfig = {
                "Content-Type": "multipart/form-data"
            }

            const data = new FormData()

            data.append("caption", caption)
            data.append("author", author)
            data.append("category", category)
            data.append("desc", desc)
            data.append("date", date)
            data.append("user_profile", image ? image : addPost.profile)

            const result = await editPostApi(_id, data, headerConfig)
            if (result.status >= 200 && result.status < 300) {

                navigate('/my-blog-view')
            }
        }
    }


    return (
        <div className='bg-black'>
            <Container data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000" className='w-50 mb-5 add_content'>

                <h1 className='add_post_Section text-center'>Edit Post</h1>
                <form action="" className='add_Details'>

                    <label htmlFor="inputTitle" className='mt-3'>Caption</label>
                    <input onChange={(e) => setInputs(e)} value={addPost.caption} type="text" name="caption" id="inputTitle" className='form-control' placeholder='Enter Caption' />

                    <label htmlFor="inputAuthor" className='mt-3'>Author Name</label>
                    <input onChange={(e) => setInputs(e)} type="text" value={addPost.author} name="author" id="inputAuthor" className='form-control' placeholder='Enter Author Name' />

                    <label htmlFor="inputCategory" className='mt-3'>Category</label>
                    <select onChange={(e) => setInputs(e)} value={addPost.category} name="category" id="inputCategory" className='form-control'>
                        <option value={"select"}>Category</option>
                        <option value={"food"}>Food</option>
                        <option value={"travel"}>Travel</option>
                        <option value={"sports"}>Sports</option>
                        <option value={"technical"}>Technical</option>
                        <option value={"nature"}>Nature</option>
                        <option value={"fashion"}>Fashion</option>

                    </select>

                    <label htmlFor="inputDesc" className='mt-3'>Description</label>
                    <textarea onChange={(e) => setInputs(e)} value={addPost.desc} name="desc" id="inputDesc" cols="30" rows="10" className='form-control' placeholder='Description'></textarea>

                    <label htmlFor="inputImage" className='mt-3'>Upload Image</label>
                    <input onChange={(e) => imageChoose(e)} type="file" name="profile" id="inputImage" className='form-control' />

                    <label htmlFor="inputDate" className='mt-3'>Submit Date</label>
                    <input onChange={(e) => setInputs(e)} value={addPost.date} type="date" name="date" id="inputDate" className='form-control' />

                    <div className='d-flex justify-content-center mt-5 '>
                        <Button onClick={(e) => handleUpdate(e)} className='add_button'>Update</Button>
                    </div>
                </form>
            </Container>

            <ToastContainer />
        </div>
    )
}

export default Edit