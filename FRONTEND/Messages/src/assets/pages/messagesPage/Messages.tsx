import Style from "./messages.module.css"
import { RiChatSmile3Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoOptionsSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";
import Api from "../../../services/api.tsx";
import Message from "../../componentes/messages/Message";
import { MessageUserLoged, MessageUserNotLoged } from "../../componentes/message/message";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

interface users {
    nome: string
    id: string
}

interface userPage {
    nome: string
    email: string
}

interface Mensagem {
    id: number;
    chat_id: number;
    remetente_id: number;
    conteudo: string;
    created_at: string;
    remetente_nome: string;
}

interface chat {
    id: number,
    usuario_id: number,
    nome_usuario_conversa: string,
    created_at: string
}

export default function Messages() {
    const { id } = useParams()
    const { chatId } = useParams()
    const [mensagens, setMensagens] = useState<Mensagem[]>([])
    const [usuarios, setUsuarios] = useState<users[]>([])
    const [usuariosId, setUsuariosId] = useState<userPage>()
    const [conteudo, setConteudo] = useState<string>("")
    const [chat, setChat] = useState<chat[]>([])
    const [menu, setMenu] = useState<boolean>(true)
    const [search, setSearch] = useState<string>("")
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [room, setRoom] = useState<boolean>(false)
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
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTo({
                top: messagesEndRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [mensagens]);


    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await Api.post(`/sendMessage/${chatId}`, { conteudo })
            setConteudo("")
            const novaMensagem = {
                remetente_id: response.data.remetente,
                chat_id: Number(chatId),
                conteudo,
                remetente_nome: usuariosId?.nome || 'Usuário',
                created_at: new Date().toISOString(),
            };
            socket.emit('send_message', novaMensagem);
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        const fetch = async () => {
            const chats = await Api.get("/getChats")
            setChat(chats.data.chats)
        }
        fetch()
    }, [])
    useEffect(() => {
        const list = async () => {
            setMensagens([])
            const response = await Api.get(`/listMessage/${chatId}`)
            setMensagens(response.data.mensagens)

        }
        const fetch1 = async () => {
            const response = await Api.get(`/getUserById/${id}`);
            setUsuariosId(response.data.usuario);
        }
        list()
        fetch1()
    }, [id, chatId])

    useEffect(() => {
        socket.on('receive_message', (novaMensagem: Mensagem) => {
            setMensagens((prevMensagens) => [...prevMensagens, novaMensagem]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const logout = async () => {
        try {
            localStorage.removeItem("token")
            localStorage.clear()
            window.location.href = "/signin"
        } catch (error) {
            console.error(error)
        }
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submit(event as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    return (
        <div className={Style.main}>
            <div className={room ? Style.rooms : Style.notRooms}>
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
                                {chat.length == 0 && <p>Sem conversas</p>}
                            </div>
                        </div>
                }
            </div>
            <div className={Style.messages}>
                <div className={Style.HeaderUser}>
                    <div>
                        <div className={Style.avatar}>{usuariosId?.nome.charAt(0)}</div>
                        <h1>{usuariosId?.nome}</h1>
                    </div>
                    <abbr title={`nome:${usuariosId?.nome} , email:${usuariosId?.email}`}>
                        <i onClick={()=>setRoom(!room)}>< IoOptionsSharp  /></i>
                    </abbr>
                </div>
                <div className={Style.ContainerMessagesList}>
                    <div className={Style.messagesList}>
                        {
                            mensagens.length > 0 && (
                                <div className={Style.messageList} ref={messagesEndRef}>
                                    {mensagens.map((mensagem) =>
                                        mensagem.remetente_id === Number(id) ? (
                                            <MessageUserNotLoged key={mensagem.id} message={mensagem.conteudo} />
                                        ) : (
                                            <MessageUserLoged key={mensagem.id} message={mensagem.conteudo} />
                                        )
                                    )}
                                </div>

                            )
                        }

                    </div>
                    <form onSubmit={submit} className={Style.inputSendMessage}>
                        <textarea onKeyDown={handleKeyDown} value={conteudo} onChange={(e) => setConteudo(e.target.value)} placeholder="Digite a sua mensagem"></textarea>
                        <button type="submit"><IoSend /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}