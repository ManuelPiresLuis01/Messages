import { Link, useNavigate } from 'react-router-dom';
import style from "./Style.module.css"
import Api from '../../../services/api';
import { useState } from 'react';


export function SignIn() {
const [email,Setemail] = useState<string>("")
const [password,Setpassword] = useState<string>("")
const submit = async (e:React.FormEvent)=>{
    e.preventDefault()

    try {
        const response = await Api.post("/signin",{email,password})
        localStorage.setItem("token",response.data.token)
       window.location.href = "/main"
    } catch (error) {
        console.error(error)
    }
}
    return (
        <div className={style.sign}>
            <div className={style.bgLogin}></div>
            <div>
                <div className={style.form}>
                    <h1>Entrar</h1>
                    <form onSubmit={submit}>
                        <input value={email} onChange={(e)=>Setemail(e.target.value)} type="text" placeholder="Phone ou email" />
                        <input value={password} onChange={(e)=>Setpassword(e.target.value)} type="password" placeholder="*************" />
                        <button type='submit'>Entrar</button>
                        <Link to="/signup">Criar conta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function SignUp() {
    const [name,setName]= useState<string>("")
    const [email,Setemail] = useState<string>("")
    const [password,Setpassword] = useState<string>("")
    const navigate = useNavigate()
    const submit = async (e:React.FormEvent)=>{

        e.preventDefault()
    
        try {
            const response = await Api.post("/signup",{name,email,password})
            console.log(response.data)
            navigate("/signin")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className={style.sign}>
            <div className={style.bgSignUp}></div>
            <div>
                <div className={style.form}>
                    <h1>Cadastro</h1>
                    <form onSubmit={submit}>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Seu nome" required/>
                        <input value={email} onChange={(e)=>Setemail(e.target.value)} type="email" placeholder='Seu email' required/>
                        <input value={password} onChange={(e)=>Setpassword(e.target.value)} type="password" placeholder="Sua password" required/>
                        <button type='submit'>Cadastrar</button>
                        <Link to="/signin">Ja tenho uma conta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}