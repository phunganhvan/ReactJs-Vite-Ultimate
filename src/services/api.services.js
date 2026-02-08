import axios from "./axios.customize"
// user APIs
const createUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id, fullName, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phoneNumber
    }
    return axios.put(URL_BACKEND, data);
}

const fetchAllUsersAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    return axios.delete(URL_BACKEND);
}

const handleUploadFile = (file , folder) => {
    const URL_BACKEND= `api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);
    return axios.post(URL_BACKEND, bodyFormData, config);
}

const updateUserAvatar = ( avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        avatar: avatar,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data);
}
const registerUserAPI = (fullName, email, password, phoneNumber) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phoneNumber
    }
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data);
}
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}


// book APIs
const getBooksAPI = (current, pageSize) =>{
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}
const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
    }
    return axios.post(URL_BACKEND, data);
}
const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
    }
    return axios.put(URL_BACKEND, data);
}
const deleteBookAPI = (_id) => {
    const URL_BACKEND = `/api/v1/book/${_id}`;
    return axios.delete(URL_BACKEND);
}

export {
    createUserAPI,
    updateUserAPI,
    fetchAllUsersAPI,
    deleteUserAPI,
    handleUploadFile,
    updateUserAvatar,
    registerUserAPI,
    loginAPI,
    getAccountAPI,
    logoutAPI,


    // book exports
    getBooksAPI,
    createBookAPI,
    updateBookAPI,
    deleteBookAPI,
}