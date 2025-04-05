import Style from "../messagesPage/messages.module.css"
import { CiSearch } from "react-icons/ci";
import { RiChatSmile3Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import Api from "../../../services/api.tsx";
import Message from "../../componentes/messages/Message";


interface users {
    nome: string
    id: string
}

interface chat {
    id: string,
    usuario_id: number,
    nome_usuario_conversa: string,
    created_at: string
}

export default function Main() {
    const [name, setName] = useState<string>("")
    const [usuarios, setUsuarios] = useState<users[]>([])
    const [menu, setMenu] = useState<boolean>(true)
    const [search, setSearch] = useState<string>("")
    const [chat, setChat] = useState<chat[]>([])
    const [room, setRoom] = useState<boolean>(true)
    const [message, setMessage] = useState<string>("Pesquisa por usuarios")
    const thereAre = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            const response = await Api.get(`/search/${search}`);
            setUsuarios(response.data.usuarios);
            if (usuarios.length == 0) {
                setMessage("Usuario não encontrado")
            } else
                setMessage("")
            setSearch("")
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get("/me")
                setName(response.data.nome)
            } catch (error) {
                console.error(error)
            }
        }
        const fetch = async () => {
            const chats = await Api.get("/getChats")
            setChat(chats.data.chats)
        }
        fetch()
        fetchData()

    }, [])

    const logout = async () => {
        try {
            localStorage.removeItem("token")
            localStorage.clear()
            window.location.href = "/signin"
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={Style.main}>
            <div  className={room ? Style.rooms : Style.notRooms}>
                <div className={Style.title}>
                    <h1>Conversar</h1>
                    <i onClick={logout}><IoIosLogOut /></i>
                </div>
                <div className={Style.options}>
                    <i onClick={() => setMenu(true)} className={menu ? Style.marked : Style.notMarked}><RiChatSmile3Line /></i>
                    <i onClick={() => setMenu(false)} className={!menu ? Style.marked : Style.notMarked}><FaUsers /></i>
                </div>
                {
                    !menu ?
                        <div>
                            <div className={Style.search}>
                                <i><CiSearch /></i>
                                <input onKeyDown={thereAre} value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Pesquise nas suas conversas " />
                            </div>
                            <div className={Style.role}>
                                {
                                    usuarios && usuarios.map(users => (
                                        <div key={users.id} onClick={()=>setRoom(!room)} >
                                            <Message
                                            name={users.nome}
                                            id={users.id}
                                        />
                                        </div>
                                    ))
                                }

                                {usuarios.length == 0 && <p>{message}</p>}
                            </div>
                        </div>
                        :
                        <div>
                            <div className={Style.role}>
                                {
                                    chat && chat.map((chatItem: chat) => (
                                        <div key={chatItem.id} onClick={()=>setRoom(!room)} >
                                        <Message
                                            name={chatItem.nome_usuario_conversa}
                                            id={chatItem.usuario_id.toString()}
                                        />
                                        </div>
                                    ))
                                }
                                {chat.length == 0 && <p>Usuarios nao encontrados</p>}
                            </div>
                        </div>
                }
            </div>
            <div className={Style.messages}>
                <div className={`${Style.ContainerMessagesList} ${Style.List}`}>
                    <div className={Style.messagesList}>
                        <div className={Style.welcome}>
                            <h1>Seja bem vindo</h1>
                            <h2>{name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}