import Style from "./messsage.module.css"
interface MessageProps {
    message: string;
}

export function MessageUserLoged(p: MessageProps) {
    return (
        <div className={Style.messageLoged}>
            <div>{p.message}</div>
        </div>
    )
}

export function MessageUserNotLoged(p: MessageProps) {
    return (
        <div className={Style.messageNotLoged}>
            <div>  {p.message}</div>
        </div>
    )
}