import Style from "../messagesPage/messages.module.css"
import { SlOptions } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import Api from "../../../services/api.tsx";
import Message from "../../componentes/messages/Message";


interface users {
    nome: string
    id: string
}

export default function Main() {
    const [name, setName] = useState<string>("")
    const [usuarios, setUsuarios] = useState<users[]>([])

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
            const response = await Api.get("/getUSers");
            setUsuarios(response.data.usuarios);
        }
        fetch()
        fetchData()

    }, [])
    return (
        <div className={Style.main}>
            <div className={Style.rooms}>
                <div className={Style.title}>
                    <h1>Conversar</h1>
                    <i><SlOptions /></i>
                </div>
                <div className={Style.search}>
                    <i><CiSearch /></i>
                    <input type="search" placeholder="Pesquise nas suas conversas " />
                </div>
                <div className={Style.role}>
                    {
                        usuarios && usuarios.map(users => (
                            <Message
                                name={users.nome}
                                id={users.id}
                            />
                        ))
                    }

                    { !usuarios && <p>Usuarios nao encontrados</p>}

                </div>
            </div>
            <div className={Style.messages}>
                <div className={Style.ContainerMessagesList}>
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