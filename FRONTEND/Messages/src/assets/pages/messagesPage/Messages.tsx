import Style from "./messages.module.css"
import { SlOptions } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import Message from "../../componentes/messages/Message";
import { MessageUserLoged, MessageUserNotLoged } from "../../componentes/message/message";

export default function Messages() {
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
                    <Message
                        name="Manuel Pires"
                        lastMessage="Onde EStas?"
                        read={false}
                    />
                       <Message
                        name="Manuel Pires"
                        lastMessage="Onde EStas?"
                        read={true}
                    />
                       <Message
                        name="Manuel Pires"
                        lastMessage="Onde EStas?"
                        read={false}
                    />
                       <Message
                        name="Manuel Pires"
                        lastMessage="Onde EStas?"
                        read={false}
                    />
                       <Message
                        name="Manuel Pires"
                        lastMessage="Onde EStas?"
                        read={false}
                    />
                </div>
            </div>
            <div className={Style.messages}>
                <div className={Style.HeaderUser}>
                    <div>
                        <div className={Style.avatar}>M</div>
                        <h1>MAnuel PIreS Luis</h1>
                    </div>
                    <i><HiMiniInformationCircle /></i>
                </div>
                <div className={Style.ContainerMessagesList}>
                    <div className={Style.messagesList}>
                        <div className={Style.messageList}>
                                <MessageUserLoged message="Oi, tudo bem?" />
                                <MessageUserNotLoged message="Sim, e tu?" />
                                <MessageUserLoged message="Estou bem, obrigado!" />
                                <MessageUserNotLoged message="Que bom! O que tens feito?" />
                                <MessageUserLoged message="Estou desenvolvendo um chat agora mesmo!" />
                                <MessageUserNotLoged message="Sério? Parece interessante!" />
                                <MessageUserLoged message="Sim, estou usando React e Node.js." />
                                <MessageUserNotLoged message="Ótima escolha! Boa sorte no projeto!" />
                                <MessageUserLoged message="Valeu! Estou focado para terminar ainda hoje." />
                                <MessageUserNotLoged message="Isso aí! Se precisar de ajuda, me chama." />
                                <MessageUserLoged message="Com certeza! Já tive que resolver alguns bugs." />
                                <MessageUserNotLoged message="Bugs sempre aparecem! O importante é não desistir." />
                                <MessageUserLoged message="Exato! Vou implementar agora a parte de tempo real." />
                                <MessageUserNotLoged message="Boa! WebSockets ou Firebase?" />
                                <MessageUserLoged message="WebSockets! Assim fica mais dinâmico." />
                                <MessageUserNotLoged message="Ótima escolha! Vai rodar liso." />
                                <MessageUserLoged message="Espero que sim! Vou testar agora." />
                                <MessageUserNotLoged message="Boa sorte! Me avisa se der certo." />
                                <MessageUserLoged message="Funcionou! As mensagens aparecem em tempo real." />
                                <MessageUserNotLoged message="Incrível! Agora só falta estilizar melhor." />
                                <MessageUserLoged message="Verdade! Vou ajustar o CSS para ficar mais bonito." />
                                <MessageUserNotLoged message="Isso! Um bom design faz muita diferença." />
                                <MessageUserLoged message="Sim, vou pedir ajuda ao designer para melhorar o layout." />
                                <MessageUserNotLoged message="Boa! Assim o projeto fica mais profissional." />
                                <MessageUserLoged message="Com certeza! Depois disso, só falta testar tudo." />
                                <MessageUserNotLoged message="Isso aí! Garantir que não tenha bugs antes de lançar." />
                                <MessageUserLoged message="Sim! Quero que o chat esteja 100% funcional." />
                                <MessageUserNotLoged message="Vai conseguir! Já avançou bastante." />
                                <MessageUserLoged message="Valeu! Estou animado para finalizar isso hoje." />
                                <MessageUserNotLoged message="Boa sorte! Qualquer coisa, estou por aqui." />
                        </div>
                    </div>
                    <div className={Style.inputSendMessage}>
                        <textarea placeholder="Digite a sua mensagem"></textarea>
                        <button><IoSend /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}