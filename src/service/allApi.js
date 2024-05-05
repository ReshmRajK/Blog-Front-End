import { baseUrl } from "./baseUrl";
import { commonStructure } from "./commonStructure";


export const userRegisterApi = async (body) => {
    return await commonStructure("POST", `${baseUrl}/express/user/register`, body)
}

export const userLoginApi = async (body) => {
    return await commonStructure("POST", `${baseUrl}/express/user/login`, body)
}

export const addPostApi = async (id, body, header) => {
    return await commonStructure("POST", `${baseUrl}/express/user/add-post/${id}`, body, header)
}

export const viewAllPostApi = async (sData) => {
    return await commonStructure("GET", `${baseUrl}/express/user/view-all-post?search=${sData}`, {})
}

export const singlePostApi = async (id) => {
    return await commonStructure('GET', `${baseUrl}/express/user/view-single-post/${id}`, {})
}

export const viewMyBlogApi = async (id) => {
    return await commonStructure('GET', `${baseUrl}/express/user/view-my-blog?myBlog=${id}`,{})
}

export const editPostApi = async (id,body,header) => {
    return await commonStructure('PUT', `${baseUrl}/express/user/edit-post/${id}`,body,header)
}

export const deletePostApi = async (id) => {
    return await commonStructure('DELETE', `${baseUrl}/express/user/post-delete/${id}`, {})
}

export const filterPostApi=async(data)=>{
    return await commonStructure('GET', `${baseUrl}/express/user/filter-post?filterData=${data}`, {})

}

export const pswResetApi = async (id,body) => {
    return await commonStructure('PUT', `${baseUrl}/express/user/psw-reset/${id}`, body)
}

export const addLikeApi = async (id,body)=>{
    return await commonStructure("POST",`${baseUrl}/express/user/like-add/${id}`,body)
}