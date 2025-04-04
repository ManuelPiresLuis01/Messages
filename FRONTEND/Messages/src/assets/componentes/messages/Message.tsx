import Style from "./Message.module.css"

interface props {
    name: string
    lastMessage: string
    read:boolean
}

export default function Message(p: props) {
    return (
        <div className={Style.message}>
            <div className={Style.avatar}> {p.name.charAt(0)}</div>
            <div className={Style.content}>
                <h2>{p.name}</h2>
                <p>{p.lastMessage}</p>
            </div>
           {
            p.read ?  <div className={Style.notRead}></div> : <div></div>
           }
        </div>
    )
}