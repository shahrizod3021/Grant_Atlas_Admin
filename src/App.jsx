import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AdminLayout} from "./Layout/AdminLayout.jsx";
import {NotFoundPage} from "./Component/NotFoundPage.jsx";
import {Login} from "./Service/Login.jsx";
import {Unathorized} from "./Component/Unathorized.jsx";
import {Rooms} from "./Pages/Rooms.jsx";
import {Order} from "./Pages/Order.jsx";
import {News} from "./Pages/News.jsx";
import {Questions} from "./Pages/Questions.jsx";
import {Comment} from "./Pages/Comment.jsx";
import {Settings} from "./Pages/Settings.jsx";
import {AboutUs} from "./Pages/AboutUs.jsx";

export const App = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<AdminLayout/>}>
                        <Route index element={<Rooms/>}/>
                        <Route path={"/order"} element={<Order/>}/>
                        <Route path={"/news"} element={<News/>}/>
                        <Route path={"/question"} element={<Questions/>} />
                        <Route path={"/comments"} element={<Comment/>}/>
                        <Route path={"/settings"} element={<Settings/>}/>
                        <Route path={"/about-us"} element={<AboutUs/>}/>
                    </Route>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                    <Route path={"/auth/login"} element={<Login/>}/>
                    <Route path={"/unathorized"} element={<Unathorized/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}