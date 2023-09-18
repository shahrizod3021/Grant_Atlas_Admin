import {Link, useLocation} from "react-router-dom";
import toast from "react-hot-toast";

export const SideBar = () => {
    const location  = useLocation().pathname

    const sides = [
        {name:  "Xonalar", link :"/", icon : 'icon-grid menu-icon text-white', method: null},
        {name:  "Buyurtmalar", link :"/order" , icon: 'fa-solid fa-sack-dollar menu-icon', method: null},
        {name:  "Yangliklar", link :"/news", icon: 'fa-solid fa-newspaper menu-icon',method: null},
        {name:  "So'rovnomalar", link :"/question",icon: 'fa-solid fa-question menu-icon', method: null},
        {name:  "Izohlar", link :"/comments", icon: 'fa-solid fa-comment menu-icon', method: null},
        {name:  "Biz haqimizda", link :"/about-us", icon: 'fa-solid fa-address-card menu-icon', method: null},
        {name:  "Sozlamar", link :"/settings", icon: 'fa-solid fa-cog menu-icon', method: null},
        {name:  "Chiqish", link :"/auth/login", icon: 'fa-solid fa-arrow-right-from-bracket menu-icon', method: function logout(){localStorage.clear()
            toast.success("Admin paneldan chiqildi")
        }}
    ]
    return(
        <div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    {sides.map((item) => (
                        <>
                            <li className="nav-item">
                                {location === item.link ? (
                                    <Link to={item.link} className="nav-link bg-warning text-white">
                                        <i className={item.icon + "text-white "} style={{marginRight:"20px"}}></i>
                                        <span className="menu-title">{item.name}</span>
                                    </Link>
                                ) : (
                                    <Link to={item.link} onClick={() => item.method()} className="nav-link bg-light  text-dark">
                                        <i className={item.icon + " text-dark"}></i>
                                        <span className="menu-title text-dark">{item.name}</span>
                                    </Link>
                                )}
                            </li>
                        </>
                    ))}
                </ul>
            </nav>
        </div>
    )
}