import {DeleteComment, GetComment, VisibleAll} from "../Service/service.js";
import {useEffect, useState} from "react";

export const Comment = () => {
    const [comments, setComments] = useState([])
    const getAll = async () => {
        setComments(await GetComment())
    }
    useEffect(() => {
        getAll()
    }, [])
    const deleteComment = async (id) => {
        if (window.confirm("Ushbu izohni olib tashlashga rozimisiz")) {
            await DeleteComment(id)
        }
    }
    const visibleAll = async (id, name, message, hidden) => {
        if (window.confirm(hidden ? "Ushbu izohni asosiy web saytda chiqarishga rozimisiz" : "Ushbu izohni asosiy web saytdan olishga rozimisiz")) {
            const data = {
                name, message,  hidden
            }
            await VisibleAll(id, data)
            await getAll()
        }
    }
    return (
        <div>
            <div className={"container-scroler"}>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Izohlar</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>T / R</th>
                                        <th>Ismi</th>
                                        <th>Izoh</th>
                                        <th>Izoh holati</th>
                                        <th>Jarayonlar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {comments.map((item, i) => (
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.message}</td>
                                                <td>{item.hidden ? "Web siteda ko'rinadi" : "Web sayta ko'rinmaydi"}</td>
                                                <td>
                                                    <button onClick={() => deleteComment(item.id)}
                                                            className={'bg-transparent border-0 '}><i
                                                        className={'fas fa-trash text-danger'}></i></button>
                                                    <button onClick={item.hidden ? () => visibleAll(item.id, item.name, item.message, false) : () => visibleAll(item.id, item.name, item.message, true)} className={'bg-transparent border-0 '}><i
                                                        className={item.hidden ? 'fas fa-eye text-primary' : 'fas fa-eye-slash text-primary'}></i>
                                                    </button>
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
        </div>
    )
}