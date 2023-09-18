import {GetData} from "../Service/service.js";
import {useEffect, useState} from "react";
import grant from '../assets/grant.jpg'
import {Link} from "react-router-dom";
export const Navbar = () => {
    const [data, setData] = useState({})
    const getAll = async () => {
        await GetData(setData)
    }

    useEffect(() => {
        getAll()
    }, [])

    const clear = () => {
        localStorage.clear()
    }

    function active (){
        document.getElementById("sidebar").classList.toggle("active")
    }

    function profile(){
        document.getElementById("profile").classList.toggle("show")
        document.getElementById("profile-down").classList.toggle("show")
    }

    return (
        <div>
            <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo mr-5" href="https://grandatlashotel.com"><img src={grant}
                                                                                       className="mr-2" alt="logo"/></a>
                    <a className="navbar-brand brand-logo-mini" href="https://grandatlashotel.com"><img src={grant}
                                                                                       alt="logo"/></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <ul className="navbar-nav mr-lg-2">
                        <li className="nav-item nav-search d-none d-lg-block">
                            <div className="input-group">

                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-nav-right">
                        <li id={"profile"} className="nav-item nav-profile dropdown">
                            <a onClick={profile} className="nav-link dropdown-toggle" href="#" data-toggle="dropdown"
                               id="profileDropdown">
                                <img src={grant} width={"100%"} alt="profile"/>
                            </a>
                            <div id={"profile-down"} className="dropdown-menu dropdown-menu-right navbar-dropdown"
                                 aria-labelledby="profileDropdown">
                                <Link to={"/settings"} className="dropdown-item">
                                    <i className="ti-settings text-primary"></i>
                                    Sozlamalar
                                </Link>
                                <a onClick={() => clear()} href={"/auth/login"} className="dropdown-item">
                                    <i className="ti-power-off text-primary"></i>
                                    Chiqish
                                </a>
                            </div>
                        </li>

                    </ul>
                    <button onClick={active} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            data-toggle="offcanvas">
                        <span className="icon-menu"></span>
                    </button>
                </div>
            </nav>
        </div>
    )
}