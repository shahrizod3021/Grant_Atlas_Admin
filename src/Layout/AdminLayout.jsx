import {Navbar} from "../Component/Navbar.jsx";
import {SideBar} from "../Component/SideBar.jsx";
import {Outlet} from "react-router-dom";
import {GetData} from "../Service/service.js";
import {useEffect, useState} from "react";
import {Unathorized} from "../Component/Unathorized.jsx";

export const AdminLayout = () => {
    const [data, setData] = useState({})
    const getAll = async () => {
        await GetData(setData)
    }

    useEffect(() => {
        getAll()
    }, [])
    return(
        <div>
            {localStorage.getItem("access_token") === null || data === null ? (
                <>
                    <Unathorized/>
                </>
            ) : (
                <>
                    <div className={"container-scroller"}>
                        <Navbar/>
                        <div className={"container-fluid page-body-wrapper"}>
                            <SideBar/>
                            <div className={"main-panel"}>
                                <div className={"content-wrapper"}>
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}