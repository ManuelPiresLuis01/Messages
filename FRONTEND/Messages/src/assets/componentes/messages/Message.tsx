import Style from "./Message.module.css"
import { Link } from "react-router-dom"

interface props {
    name: string
    id: string
}

export default function Message(p: props) {
    return (
        <Link to={`/messages/${p.id}`} className={Style.message}>
            <div className={Style.message}>
                <div className={Style.avatar}> {p.name.charAt(0)}</div>
                <div className={Style.content}>
                    <h2>{p.name}</h2>
                {  /*  <p>{p.lastMessage}</p>*/}
                </div>
                {/*
                    p.read ? <div className={Style.notRead}></div> : <div></div>
              */  }
            </div>
        </Link>
    )
}