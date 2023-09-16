import logo from '../assets/grant.jpg'
import {useState} from "react";
import {LoginAction} from "./service.js";
import {useNavigate} from "react-router-dom";
export const Login =() => {
    const [username,setUsername ] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const login = async () => {
        const data = {
            username, password
        }
        await LoginAction(data)
        setTimeout(() => {
            navigate(localStorage.getItem("path"))
        }, 2000)
    }
    return(
        <div>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src={logo}  className={"w-25"} alt="logo"/>
                                    </div>
                                    <h4>Salom. Grant Atlas'ga hush kelbisz</h4>
                                    <h6 className="font-weight-light">Zarur ma'lumotlarni kiritng</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg"
                                                   id="email" placeholder="Email pochta" value={username} onChange={e => setUsername(e.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg"
                                                   id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} placeholder="Parol"/>
                                        </div>
                                        <div className="mt-3">
                                            <button onClick={() => login()} type={"button"} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                               >Kirish </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}