import Style from "./Message.module.css"
import Api from "../../../services/api"
import { useNavigate } from "react-router-dom"

interface props {
    name: string
    id: string
}

export default function Message(p: props) {
    const navigate = useNavigate()
    const receptor: string = p.id
    const click = async () => {
        try {
            const response = await Api.post("/chat", {receptor})
            navigate(`/messages/${receptor}/${response.data.chat_id}`)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div onClick={click} className={Style.message}>
            <div className={Style.avatar}> {p.name.charAt(0)}</div>
            <div className={Style.content}>
                <h2>{p.name}</h2>
                {  /*  <p>{p.lastMessage}</p>*/}
            </div>
            {/*
                    p.read ? <div className={Style.notRead}></div> : <div></div>
              */  }
        </div>
    )
}