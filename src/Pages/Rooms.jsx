import Carousel from "react-multi-carousel";
import {useEffect, useState} from "react";
import {AddRoom, DeleteImgs, DeleteRoom, EditRoom, GetRooms, UploadPhoto} from "../Service/service.js";
import {Apis} from "../Service/Apis.js";
import {Form} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "../Service/BaseUrl.js";
import toast from "react-hot-toast";

export const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [nameUz, setNameUz] = useState('')
    const [nameRu, setNameRu] = useState('')
    const [nameEng, setNameEng] = useState('')
    const [nameTurk, setNameTurk] = useState('')
    const [descriptionUz, setDescriptionUz] = useState('')
    const [descriptionRu, setDescriptionRu] = useState('')
    const [descriptionEng, setDescriptionEng] = useState('')
    const [descriptionTurk, setDescriptionTurk] = useState('')
    const [howMuch, setHowMuch] = useState('')
    const [howMany, setHowMany] = useState('')
    const [size, setSize] = useState('')
    const [id, setId] = useState('')
    const [more, setMore] = useState('')


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    const data = {
        nameUz,
        nameRu,
        nameEng,
        nameTurk,
        descriptionUz,
        descriptionRu,
        descriptionEng,
        descriptionTurk,
        howMany,
        howMuch,
        size
    }

    const getAll = async () => {
        setRooms(await GetRooms())
    }

    useEffect(() => {
        getAll()
    }, [])

    const addRoom = async () => {
        await AddRoom(data)
        await getAll()
        await clear()
    }

    const editRoom = async () => {
        await EditRoom(id, data)
        await getAll()
        clear()
    }

    const deleteRoom = async (id) => {
        if (window.confirm("Xonani olib tashlashga rozimisiz")) {
            await DeleteRoom(id)
            await getAll()
        }
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
        setHowMuch("")
        setHowMuch("")
        setSize("")

    }
    const uploadPhoto = async () => {
        toast("Iltimos kutib turing bu bir qancha vaqt talab qilishi mumkin", {
            className: "bg-info text-white",
            icon: "⚠️"
        })
        const img = document.getElementById("img").files[0]
        const formData = new FormData()
        formData.append("photo", img)
        await UploadPhoto(formData)
        const photoId = localStorage.getItem("photoId")
        await axios.put(BaseUrl + Apis.rooms + "/upload/" + localStorage.getItem("roomId") + "?photoId=" + photoId)
        await getAll()
        return toast.success("xona rasmi saqlandi")
    }

    const deleteImgs = async (id) => {
        if (window.confirm("rasmlarni olib tashlashga rozimisiz ?")) {
            await DeleteImgs(id)
            await getAll()

        }
    }

    const catchId = (id) => {
        localStorage.setItem("roomId", id)
    }
    return (
        <div>
            <div className={"container-scroller"}>
                <button type={"button"} data-bs-toggle="modal" data-bs-target="#exampleModal"
                        className={"btn btn-warning text-white mb-3"}>Yangi xona <i
                    className={"fas fa-plus-circle"}></i></button>
                <div className={"row row-cols-1 row-cols-md-3 g-4"}>
                    {rooms.map((item) => (
                        <>
                            <div className="card col mb-2">
                                <Carousel responsive={responsive}
                                          infinite
                                          autoPlay
                                          autoPlaySpeed={10000}
                                          arrows={false}
                                          swipeable={true}
                                >
                                    {item.roomImgList.map((item) => (
                                        <>
                                            <img draggable={false} src={Apis.getContent + item.roomImg}
                                                 className={"card-img-top"} style={{height: "38vh"}} alt=""/>
                                        </>
                                    ))}
                                </Carousel>

                                <div className="card-body bg-warning text-white">
                                    <p className={"card-text"}>Xona turi: {item.nameUz}</p>
                                    <p className="card-text">Xona haqida
                                        qisqacha: {item.description.length > 30 ? <>{item.description.substring(0, 20)}...</> : <>{item.description}</>}</p>
                                    <p className={"card-text"}>Mahalliy mehmonlar uchun: {item.howMany} so'm</p>
                                    <p className={"card-text"}>Chet elliklar uchun: {item.howMuchRoom} so'm</p>
                                    <button className={'btn btn-sm btn-light'} data-bs-toggle={"modal"}
                                            data-bs-target={"#more"} onClick={() => setMore(item.description)}
                                            style={{marginRight: "10px"}}>Ko'proq
                                    </button>
                                    <button onClick={() => setId(item.id)} className={'btn btn-sm btn-light'}
                                            data-bs-toggle={"modal"}
                                            data-bs-target={"#editModal"} style={{marginRight: '10px'}}><i
                                        style={{fontSize: "10px"}} className={"fas fa-pencil text-warning"}></i>
                                    </button>
                                    <button onClick={() => deleteRoom(item.id)} style={{marginRight: '10px'}}
                                            type={"button"} className={'btn btn-sm btn-light'}><i
                                        style={{fontSize: "10px"}}
                                        className={"fas fa-trash text-danger"}></i>
                                    </button>
                                    <button style={{marginRight: '10px'}} onClick={() => deleteImgs(item.id)}
                                            className={"btn btn-sm btn-light"}><i
                                        style={{fontSize: "12px"}} className={"fas fa-trash-can-arrow-up"}></i></button>
                                    <button onClick={() => catchId(item.id)} data-bs-toggle={"modal"}
                                            data-bs-target={"#uploadPhoto"}
                                            className={"btn btn-light btn-sm"}>
                                        <i className={"fas fa-image"} style={{fontSize: "10px"}}></i>
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}

                </div>

            </div>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Xona taxrirlash</h3>
                            <button type="button" className="bg-transparent border-0" data-bs-dismiss="modal"><i
                                className={"fas fa-x"}></i></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Xona nomini taxrirlang (uzb)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameUz}
                                       onChange={e => setNameUz(e.target.value)} id={"name"} name={"name"}/>
                                <label htmlFor="name">
                                    Xona nomini taxrirlang (ru)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameRu}
                                       onChange={e => setNameRu(e.target.value)} id={"nameRu"} name={"nameRu"}/>
                                <label htmlFor="name">
                                    Xona nomini taxrirlang (eng)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameEng}
                                       onChange={e => setNameEng(e.target.value)} id={"nameEng"} name={"nameEng"}/>
                                <label htmlFor="name">
                                    Xona nomini taxrirlang (turk)
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={nameTurk}
                                       onChange={e => setNameTurk(e.target.value)} id={"nameTurk"} name={"nameTurk"}/>
                                <label htmlFor="name">
                                    Xona haqida taxrirlang (uzb)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionUz}
                                          onChange={e => setDescriptionUz(e.target.value)} id={"descriptionUz"}
                                          name={"descriptionUz"}></textarea>
                                <label htmlFor="name">
                                    Xona haqida taxrirlang (ru)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionRu}
                                          onChange={e => setDescriptionRu(e.target.value)} id={"descriptionRu"}
                                          name={"descriptionRu"}></textarea>
                                <label htmlFor="name">
                                    Xona haqida taxrirlang (eng)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionEng}
                                          onChange={e => setDescriptionEng(e.target.value)} id={"descriptionEng"}
                                          name={"descriptionEng"}></textarea>
                                <label htmlFor="name">
                                    Xona haqida taxrirlang (turk)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionTurk}
                                          onChange={e => setDescriptionTurk(e.target.value)} id={"descriptionTurk"}
                                          name={"descriptionTurk"}></textarea>

                                <label htmlFor="howMany">
                                    Mahalliy mehmonlar uchun
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={howMany}
                                       onChange={e => setHowMany(e.target.value)} id={"howMany"}
                                       name={"howMany"}/>

                                <label htmlFor="howMuch">
                                    Chet ellik mehmonlar uchun
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={howMuch}
                                       onChange={e => setHowMuch(e.target.value)} id={"howMuch"}
                                       name={"howMuch"}/>
                                <label htmlFor="szie">
                                    Tour firmalar uchun
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={size}
                                       onChange={e => setSize(e.target.value)} id={"szie"}
                                       name={"size"}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-warning text-white"
                                    onClick={() => editRoom()}>Taxrirlang
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">Xona qo'shish</h3>
                            <button type="button" className="bg-transparent border-0" data-bs-dismiss="modal"><i
                                className={"fas fa-x"}></i></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="name">
                                    Xona nomi (uzb)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameUz}
                                       onChange={e => setNameUz(e.target.value)} id={"name"} name={"name"}/>
                                <label htmlFor="name">
                                    Xona nomi (ru)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameRu}
                                       onChange={e => setNameRu(e.target.value)} id={"nameRu"} name={"nameRu"}/>
                                <label htmlFor="name">
                                    Xona nomi (eng)
                                </label>
                                <input type="text" className={"form-control mb-3"} value={nameEng}
                                       onChange={e => setNameEng(e.target.value)} id={"nameEng"} name={"nameEng"}/>
                                <label htmlFor="name">
                                    Xona nomi (turk)
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={nameTurk}
                                       onChange={e => setNameTurk(e.target.value)} id={"nameTurk"} name={"nameTurk"}/>
                                <label htmlFor="name">
                                    Xona haqida (uzb)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionUz}
                                          onChange={e => setDescriptionUz(e.target.value)} id={"descriptionUz"}
                                          name={"descriptionUz"}></textarea>
                                <label htmlFor="name">
                                    Xona haqida (ru)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionRu}
                                          onChange={e => setDescriptionRu(e.target.value)} id={"descriptionRu"}
                                          name={"descriptionRu"}></textarea>
                                <label htmlFor="descriptionEng">
                                    Xona haqida (eng)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionEng}
                                          onChange={e => setDescriptionEng(e.target.value)} id={"descriptionEng"}
                                          name={"descriptionEng"}></textarea>
                                <label htmlFor="descriptionTurk">
                                    Xona haqida (turk)
                                </label>
                                <textarea rows={3} className={"form-control mb-3"} value={descriptionTurk}
                                          onChange={e => setDescriptionTurk(e.target.value)} id={"descriptionTurk"}
                                          name={"descriptionTurk"}></textarea>

                                <label htmlFor="mahalla">
                                    Mahalliy mehmonlar uchun
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={howMany}
                                       onChange={e => setHowMany(e.target.value)} id={"mahalla"}
                                       name={"mahalla"}/>

                                <label htmlFor="chetel">
                                    Chet ellik mehmonlar uchun
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={howMuch}
                                       onChange={e => setHowMuch(e.target.value)} id={"chetel"}
                                       name={"chetel"}/>
                                <label htmlFor="ferm">
                                    Tour firmalar uchun
                                </label>
                                <input type={"text"} className={"form-control mb-3"} value={size}
                                       onChange={e => setSize(e.target.value)} id={"ferm"}
                                       name={"ferm"}/>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                            <button type="button" className="btn btn-warning text-white" data-bs-toggle={"modal"}
                                    data-bs-target={"#uploadPhoto"} onClick={() => addRoom()}>Saqlash
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