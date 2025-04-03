import Style from "./messages.module.css"
import { SlOptions } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { HiMiniInformationCircle } from "react-icons/hi2";
import Message from "../../componentes/message/Message";

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
                </div>
            </div>
            <div className={Style.messages}>
                <div className={Style.HeaderUser}>
                    <div>
                        <div className={Style.avatar}>M</div>
                        <h1>MAnuel PIreS Luis</h1>
                    </div>
                    <i><HiMiniInformationCircle/></i>
                </div>
            </div>
        </div>
    )
}