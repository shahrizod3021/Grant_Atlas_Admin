import {DeleteNews, DeleteRequest, GetRequests} from "../Service/service.js";
import {useEffect, useState} from "react";

export const Questions = () => {
    const [requests, setRequests] = useState([])
    const getAll = async () => {
        setRequests(await GetRequests())
    }

    useEffect(() => {
        getAll()
    }, [])

    const deleteRequest = async (id) => {
        if (window.confirm("So'rovnomani olib tashlashga rozimisiz ?")){
            await DeleteRequest(id)
            await getAll()
        }
    }
    return (
        <div>
            <div className={"container-scroller"}>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">So'rvonomalar</h4>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>T / R</th>
                                        <th>Ismi</th>
                                        <th>Telefon raqam</th>
                                        <th>Qisqacha tavsilot</th>
                                        <th>Olib tashlash</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {requests.map((request, i) => (
                                        <>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{request.name}</td>
                                                <td>{request.phoneNumber}</td>
                                                <td>salom</td>
                                                <td>
                                                    <button onClick={() => deleteRequest(request.id)} className={"bg-transparent border-0"}><i
                                                        className={"fas fa-trash text-danger"}></i></button>
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