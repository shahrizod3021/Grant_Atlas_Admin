import face from '../assets/images/faces/face1.jpg'
import {useEffect, useState} from "react";
import {AddNews, DeleteNews, EditNews, GetNews, UploadPhoto} from "../Service/service.js";
import axios from "axios";
import {BaseUrl} from "../Service/BaseUrl.js";
import {Apis} from "../Service/Apis.js";
import toast from "react-hot-toast";

export const News = () => {
    const [nameUz, setNameUz] = useState('')
    const [nameRu, setNameRu] = useState('')
    const [nameEng, setNameEng] = useState('')
    const [nameTurk, setNameTurk] = useState('')
    const [descriptionUz, setDescriptionUz] = useState('')
    const [descriptionRu, setDescriptionRu] = useState('')
    const [descriptionEng, setDescriptionEng] = useState('')
    const [descriptionTurk, setDescriptionTurk] = useState('')
    const [news, setNews] = useState([])
    const [id, setId] = useState('')
    const [more, setMore] = useState('')

    const data = {
        nameUz, nameRu, nameEng, nameTurk, descriptionUz, descriptionRu, descriptionEng, descriptionTurk
    }

    const getAll = async () => {
        setNews(await GetNews())
    }

    useEffect(() => {
        getAll()
    }, [])

    const uploadPhoto = async () => {
        const img = document.getElementById("img").files[0]
        const formData = new FormData()
        formData.append("photo", img)
        await UploadPhoto(formData)
        const photoId = localStorage.getItem("photoId")
        await axios.put(BaseUrl + Apis.news + "/upload/" + localStorage.getItem("newsId") + "?photoId=" + photoId)
        await getAll()
        return toast.success("yangilik rasmi saqlandi")
    }
    const addNews = async () => {

        await AddNews(data)
        clear()
        await getAll()
    }

    const editNews = async () => {
        await EditNews(id, data)
        await getAll()
        clear()
    }

    const clear = () => {
        setNameUz("")
        setNameRu("")
        setNameEng("")
        setNameTurk("")
        setDescriptionUz("")
        setDescriptionRu("")
        setDescriptionEng("")
        setDescriptionTurk("")

    }
    const deleteNews = async (id) => {
        if (window.confirm("Yangilikni olib tashlashga rozimisiz")) {
            await DeleteNews(id)
            await getAll()
        }
    }
    return (
        <div>
            <div className={"container-scroller"}>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Yangiliklar</h4>
                            <button className={"btn btn-warning btn-sm"} type={"button"} data-bs-target={"#addNews"}
                                    data-bs-toggle={"modal"}>Yangilik qo'shish <i className={"fas fa-plus-circle"}></i>
                            </button>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>
                                            Rasm
                                        </th>
                                        <th>
                                            Yangilik
                                        </th>
                                        <th>
                                            Haqida qisqacha
                                        </th>
                                        <th>
                                            Jarayonlar
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {news.map((item) => (
                                        <>
                                            <tr>
                                                <td className="py-1">
                                                    <img src={Apis.getContent + item.img} alt="image"/>
                                                </td>
                                                <td>
                                                    {item.nameUz}
                                                </td>
                                                <td>
                                                    {item.descriptionUz.substring(0, 20)}...
                                                </td>
                                                <td>
                                                    <button onClick={() => setId(item.id)} data-bs-toggle={"modal"} data-bs-target={"#editNews"}
                                                            className={'bg-transparent border-0'}><i
                                                        className={"fas fa-pencil text-warning"}></i></button>
                                                    <button onClick={() => deleteNews(item.id)}
                                                            className={'bg-transparent border-0'}><i
                                                        className={"fas fa-trash text-danger"}></i></button>
                                                    <button data-bs-toggle={"modal"} data-bs-target={"#more"} onClick={() => setMore(item.descriptionUz)} className={'bg-transparent border-0'}><i
                                                        className={"fas fa-eye text-primary"}></i></button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editNews" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Yangilik taxrirlash</h3>
                            <button type="button" className="bg-transparent border-0" data-bs-dismiss="modal"><i
                                className={"fas fa-x"}></i></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Yangilik nomini taxrirlang (uzb)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameUz}
                                       onChange={e => setNameUz(e.target.value)} id={"name"} name={"name"}/>
                                <label htmlFor="nameRu">
                                    Yangilik nomini taxrirlang (ru)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameRu}
                                       onChange={e => setNameRu(e.target.value)} id={"nameRu"} name={"nameRu"}/>
                                <label htmlFor="nameEng">
                                    Yangilik nomini taxrirlang (eng)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameEng}
                                       onChange={e => setNameEng(e.target.value)} id={"nameEng"} name={"nameEng"}/>
                                <label htmlFor="nameTurk">
                                    Yangilik nomini taxrirlang (turk)
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={nameTurk}
                                       onChange={e => setNameTurk(e.target.value)} id={"nameTurk"} name={"nameTurk"}/>
                                <label htmlFor="descriptionUz">
                                    Yangilik haqidani taxrirlang (uzb)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionUz}
                                          onChange={e => setDescriptionUz(e.target.value)} id={"descriptionUz"}
                                          name={"descriptionUz"}></textarea>
                                <label htmlFor="descriptionRu">
                                    Yangilik haqidani taxrirlang (ru)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionRu}
                                          onChange={e => setDescriptionRu(e.target.value)} id={"descriptionRu"}
                                          name={"descriptionRu"}></textarea>
                                <label htmlFor="descriptionEng">
                                    Yangilik haqidani taxrirlang (eng)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionEng}
                                          onChange={e => setDescriptionEng(e.target.value)} id={"descriptionEng"}
                                          name={"descriptionEng"}></textarea>
                                <label htmlFor="descriptionTurk">
                                    Yangilik haqidani taxrirlang (turk)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionTurk}
                                          onChange={e => setDescriptionTurk(e.target.value)} id={"descriptionTurk"}
                                          name={"descriptionTurk"}></textarea>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-warning"  onClick={() => editNews()}>Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="addNews" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Yangilik qo'shish</h3>
                            <button type="button" className="bg-transparent border-0" data-bs-dismiss="modal"><i
                                className={"fas fa-x"}></i></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Yangilik nomi (uzb)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameUz}
                                       onChange={e => setNameUz(e.target.value)} id={"name"} name={"name"}/>
                                <label htmlFor="nameRu">
                                    Yangilik nomi (ru)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameRu}
                                       onChange={e => setNameRu(e.target.value)} id={"nameRu"} name={"nameRu"}/>
                                <label htmlFor="nameEng">
                                    Yangilik nomi (eng)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameEng}
                                       onChange={e => setNameEng(e.target.value)} id={"nameEng"} name={"nameEng"}/>
                                <label htmlFor="nameTurk">
                                    Yangilik nomi (turk)
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={nameTurk}
                                       onChange={e => setNameTurk(e.target.value)} id={"nameTurk"} name={"nameTurk"}/>
                                <label htmlFor="descriptionUz">
                                    Yangilik haqida (uzb)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionUz}
                                          onChange={e => setDescriptionUz(e.target.value)} id={"descriptionUz"}
                                          name={"descriptionUz"}></textarea>
                                <label htmlFor="descriptionRu">
                                    Yangilik haqida (ru)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionRu}
                                          onChange={e => setDescriptionRu(e.target.value)} id={"descriptionRu"}
                                          name={"descriptionRu"}></textarea>
                                <label htmlFor="descriptionEng">
                                    Yangilik haqida (eng)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionEng}
                                          onChange={e => setDescriptionEng(e.target.value)} id={"descriptionEng"}
                                          name={"descriptionEng"}></textarea>
                                <label htmlFor="descriptionTurk">
                                    Yangilik haqida (turk)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionTurk}
                                          onChange={e => setDescriptionTurk(e.target.value)} id={"descriptionTurk"}
                                          name={"descriptionTurk"}></textarea>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                            <button type="button"  className="btn btn-warning" data-bs-toggle={"modal"}
                                    data-bs-target={"#uploadPhoto"} onClick={() => addNews()}>Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="uploadPhoto" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Rasm joylash</h3>
                            <button type="button" className="bg-transparent border-0" data-bs-dismiss="modal"><i
                                className={"fas fa-x"}></i></button>
                        </div>
                        <div className={"uploadPhoto"}>
                            <div className={"col-12"} style={{height: '100%', borderStyle: 'dashed'}}>
                                <label className={"w-100 d-flex flex-column"} style={{height: '100%'}}
                                       htmlFor={"img"}>
                                    <h2 className={"text-center"}>Вставить изображение</h2>
                                    <i className={"text-center  fas fa-cloud-upload"}
                                       style={{fontSize: "50px"}}></i>
                                </label>
                                <input type="file" className={"d-none"} accept={"image/png, image/jpeg"} id={"img"}
                                       name={"img"}
                                       onChange={() => uploadPhoto()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="more" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Ko'proq</h3>
                            <button type="button" className="bg-transparent border-0" data-bs-dismiss="modal"><i
                                className={"fas fa-x"}></i></button>
                        </div>
                        <div className={'modal-body'}>
                            <p className={"text-dark"}>{more}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}