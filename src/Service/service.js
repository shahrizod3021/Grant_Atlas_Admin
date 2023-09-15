import axios from "axios";
import {BaseUrl} from "./BaseUrl.js";
import {Apis} from "./Apis.js";
import {isSuccess} from "./isSuccess.js";
import toast from "react-hot-toast";

export const LoginAction = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.auth + "/login", data)
        if (isSuccess(res.status)) {
            localStorage.setItem("access_token", res.data.token)
            localStorage.setItem("user_uuid", res.data.user.id)
            localStorage.setItem("path", "/")
            return toast.success("Hush kelbisiz 👋")
        }
    } catch (err) {
        if (err.response.status === 401) {
            localStorage.setItem("path", "/unathorized")
        }
    }
}

export const GetData = async (setUser) => {
    try {
        const res = await axios.get(BaseUrl + Apis.auth + "/" + localStorage.getItem('user_uuid'))
        if (isSuccess(res.status)) {
            return setUser(res.data)
        }
    } catch (err) {
        setUser(null)
        return console.error("Admin panelga kirib bo'lmadi")
    }
}

export const EditData = async (name, email, password) => {
    try {
        const res = await axios.put(BaseUrl + Apis.auth + "/" + localStorage.getItem("user_uuid") + "?name=" + name + "&email=" + email + "&password=" + password)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        return toast.error(err.message)
    }
}
export const GetRooms = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.rooms)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error("Ma'lumotlar topilmadi")
    }
}

export const EditAboutUs = async (id, data) => {
    try {
        const res = await axios.put(BaseUrl + Apis.about + "/" + id, data)
        if (isSuccess(res.status)){
            return toast.success("Ma'lumotlar taxrirlandi")
        }
    }catch (err){
        return toast.error("Taxrirlab bo'lmadi")
    }
}

export const AddRoom = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.rooms, data)
        if (isSuccess(res.status)) {
            localStorage.setItem("roomId", res.data)
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const GetAbout = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.about)
        if (isSuccess(res.status)){
            return res.data._embedded.list[0]
        }
    }catch (err){
        return toast.error("Hatolik")
    }
}

export const UploadPhoto = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.upload, data)
        if (isSuccess(res.status)) {
            localStorage.setItem("photoId", res.data)
        }
    } catch (err) {
        if (err.response.status === 400) {
            return toast.error(err.response.data.message)
        }
    }
}

export const EditRoom = async (id, data) => {
    try {
        const res = await axios.put(BaseUrl + Apis.rooms + "/edit-data/" + id, data)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 404) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.message)
    }
}

export const DeleteRoom = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.rooms + "/" + id)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 404) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.message)
    }
}

export const DeleteImgs = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.rooms + "/img/" + id)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 404) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.message)
    }
}

export const GetOrders = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.order)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const DeleteOrder = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.order + "/" + id)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 404) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.response.data.message)
    }
}

export const AddNews = async (data) => {
    try {
        const res = await axios.post(BaseUrl + Apis.news, data)
        if (isSuccess(res.status)) {
            localStorage.setItem("newsId", res.data)
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const GetNews = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.news)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const DeleteNews = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.news + "/" + id)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 404) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.message)
    }
}

export const EditNews = async (id, data) => {
    try {
        const res = await axios.put(BaseUrl + Apis.news + "/" + id, data)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.status === 404) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.message)
    }
}

export const GetRequests = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.request)
        if (isSuccess(res.status)) {
            return res.data
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const DeleteRequest = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.request + '/' + id)
        if (isSuccess(res.status)) {
            return toast.success(res.data.message)
        }
    } catch (err) {
        if (err.response.data.message) {
            return toast.error(err.response.data.message)
        }
        return toast.error(err.message)
    }
}

export const GetComment = async () => {
    try {
        const res = await axios.get(BaseUrl + Apis.comment)
        if (isSuccess(res.status)) {
            return res.data._embedded.list
        }
    } catch (err) {
        return toast.error(err.message)
    }
}

export const DeleteComment = async (id) => {
    try {
        const res = await axios.delete(BaseUrl + Apis.comment + "/" + id)
        if (isSuccess(res.status)) {
            return toast.success("Izoh olib tashlandi")
        }
    } catch (err) {
        return toast.error(err.message)
    }
}
export const VisibleAll = async (id, data) => {
    try {
        const res = await axios.put(BaseUrl + Apis.comment + "/" + id, data)
        if (isSuccess(res.status)) {
            return toast.success(data.hidden ? "Ushbu habar endi hammaga ko'rinadi" : "Ushbu habar asosiy web saydan olindi", {duration: 5000})
        }
    } catch (err) {
        return toast.error(err.message)
    }

}