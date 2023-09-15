import {EditAboutUs, GetAbout} from "../Service/service.js";
import {useEffect, useState} from "react";

export const AboutUs = () => {
    const [descriptionUz1, setDescriptionUz] = useState('')
    const [descriptionRu1, setDescriptionRu] = useState('')
    const [descriptionEng1, setDescriptionEng] = useState('')
    const [descriptionTurk1, setDescriptionTurk] = useState('')
    const [totalGuestsNumber1, setTotalGuestsNumber] = useState('')
    const [totalRoomSize1, setTotalRoomSize] = useState('')
    const [about, setAbout] = useState({})
    const getAll = async () => {
        setAbout(await GetAbout())
    }

    useEffect(() => {
        getAll()
    }, [])

    const editAboutUs = async (id,descriptionUz, descriptionRu, descriptionEng, descriptionTurk, totalGuestsNumber, totalRoomSize) => {
        const data = {
            descriptionUz : descriptionUz1.length !== 0 ? descriptionUz1 : descriptionUz, descriptionRu: descriptionRu1.length !== 0 ? descriptionRu1 : descriptionRu, descriptionEng : descriptionEng1.length !== 0 ? descriptionEng1 : descriptionEng, descriptionTurk : descriptionTurk1.length !== 0 ? descriptionTurk1 : descriptionTurk, totalGuestsNumber: totalGuestsNumber1.length !== 0 ? totalGuestsNumber1 : totalGuestsNumber, totalRoomSize: totalRoomSize1.length !== 0 ? totalRoomSize1 : totalRoomSize
        }
        await EditAboutUs(id, data)
        await getAll()
        setTotalRoomSize('')
        setTotalGuestsNumber('')
        setDescriptionUz("")
        setDescriptionTurk("")
        setDescriptionEng("")
        setDescriptionRu("")
    }

    return(
        <div>
            <div className={'container-scroller'}>
                <form >
                    <label htmlFor="descriptionUz">Haqida (uzb)</label>
                    <textarea name="descriptionUz" id="descripitonUz " value={descriptionUz1} onChange={e => setDescriptionUz(e.target.value)} className={"form-control w-50 mb-4"} cols="10" rows="3"></textarea>
                    <label htmlFor="descriptionRu">Haqida (ru)</label>
                    <textarea name="descriptionRu" id="descriptionRu" value={descriptionRu1} onChange={e => setDescriptionRu(e.target.value)} className={"form-control w-50 mb-4"} cols="10" rows="3"></textarea>
                    <label htmlFor="descriptionEng">Haqida (eng)</label>
                    <textarea name="descriptionEng" id="descriptionEng" value={descriptionEng1} onChange={e => setDescriptionEng(e.target.value)} className={"form-control w-50 mb-4"} cols="10" rows="3"></textarea>
                    <label htmlFor="descriptionTurk">Haqida (turk)</label>
                    <textarea name="descriptionTurk" id="descriptionTurk" value={descriptionTurk1} onChange={e => setDescriptionTurk(e.target.value)} className={"form-control w-50 mb-4"} cols="10" rows="3"></textarea>
                    <label htmlFor="number-of-rooms">Xonalar soni</label>
                    <input placeholder={about.totalRoomSize} type="number" id={"number-of-rooms"} name={"number-of-rooms"} className={"form-control w-50 mb-5"} value={totalRoomSize1} onChange={e => setTotalRoomSize(e.target.value)}/>
                    <label htmlFor="number-of-guest">Mexmonlar sig'imi</label>
                    <input id={"number-of-guest"} placeholder={about.totalGuestsNumber} name={"number-of-guest"} type="number" className={"form-control w-50 mb-5"} value={totalGuestsNumber1} onChange={e => setTotalGuestsNumber(e.target.value)}/>
                    <button type={"button"} className={"btn btn-warning text-white"} onClick={() => editAboutUs(about.id, about.descriptionUz, about.descriptionRu, about.descriptionEng, about.descriptionTurk, about.totalGuestsNumber, about.totalRoomSize)}>Taxrirlash</button>
                </form>
            </div>
        </div>
    )
}