import {useState} from "react";
import {EditData} from "../Service/service.js";

export const Settings = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('' )

    const editData = async () => {
        await EditData(name, email, password)
        setName("")
        setPassword("")
        setEmail("")
    }
    return (
        <div>
            <div className={"container-scroller"}>
                <form >
                    <label htmlFor="email">Emailni taxrirlash uchun shu yerga kiriting</label>
                    <input type="email" id={"email"} name={"email"} value={email} onChange={e => setEmail(e.target.value)}  placeholder={"mail@gmail.com"} className={"form-control mb-4"}/>
                    <label htmlFor="password">Parolni taxrirlash uchun shu yerga kiriting</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} className={"form-control"} placeholder={"********"} value={password}/>
                    <button type={"button"} onClick={() => editData()} className={"btn btn-warning mt-4 text-white"}>Taxrirlash</button>
                </form>
            </div>
        </div>
    )
}