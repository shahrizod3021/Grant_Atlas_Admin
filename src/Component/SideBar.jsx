import {Link, useLocation} from "react-router-dom";

export const SideBar = () => {
    const location  = useLocation().pathname

    const sides = [
        {name:  "Xonalar", link :"/", icon : 'icon-grid menu-icon text-white'},
        {name:  "Buyurtmalar", link :"/order" , icon: 'fa-solid fa-sack-dollar menu-icon'},
        {name:  "Yangliklar", link :"/news", icon: 'fa-solid fa-newspaper menu-icon'},
        {name:  "So'rovnomalar", link :"/question",icon: 'fa-solid fa-question menu-icon'},
        {name:  "Izohlar", link :"/comments", icon: 'fa-solid fa-comment menu-icon'},
        {name:  "Biz haqimizda", link :"/about-us", icon: 'fa-solid fa-address-card menu-icon'}
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
                                    <Link to={item.link} className="nav-link bg-light  text-dark">
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