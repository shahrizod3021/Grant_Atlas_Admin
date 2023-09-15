import {DeleteOrder, GetOrders} from "../Service/service.js";
import {useEffect, useState} from "react";

export const Order = () => {
    const [orders, setOrders] = useState([])


    const getAll = async () => {
        setOrders(await GetOrders())
    }

    useEffect(() => {
        getAll()
    }, [])

    const deleteOrder = async (id) => {
        if (window.confirm("Buyurtmani olib tashlashga rozimisiz ?")){
            await DeleteOrder(id)
            await getAll()
        }
    }
    return (
        <div>
            <div className={"container-scroller"}>
                <div className={"table-responsive"}>
                    <table className={"table table-bordered"}>
                        <thead>
                        <tr>
                            <th className={"text-center"}>T/r</th>
                            <th className={"text-center"}>Katta yoshdaigalar soni</th>
                            <th className={"text-center"}>Kichik yoshdagilar soni</th>
                            <th className={"text-center"}>Xona turi</th>
                            <th className={"text-center"}>Kelish sanasi</th>
                            <th className={"text-center"}>Ketish sanasi</th>
                            <th className={"text-center"}>Telefon raqam</th>
                            <th className={"text-center"}>Olib tashlash</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, i) => (
                            <>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{order.parentsNumber}</td>
                                    <td>{order.childNumber}</td>
                                    <td>{order.rooms.nameUz}</td>
                                    <td>{order.arrivalDate}</td>
                                    <td>{order.departureDate}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>
                                        <button onClick={() => deleteOrder(order.id)} className={"border-0 bg-transparent w-100"}><i
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
    )
}