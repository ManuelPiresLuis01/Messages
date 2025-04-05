import { Link} from 'react-router-dom';
import style from "./Style.module.css"
import Api from '../../../services/api';
import { useState } from 'react';
import { ClipLoader} from 'react-spinners';
import SuccessModal from '../succes/succes';

export function SignIn() {
    const [email, Setemail] = useState<string>("")
    const [password, Setpassword] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [succes,setSucces] = useState <boolean> (false)
    const submit = async (e: React.FormEvent) => {
        if (email === "" && password === "") return;
        e.preventDefault()
        setLoading(true);
        try {
            const response = await Api.post("/signin", { email, password })
            setSucces(true)
            setLoading(false);
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false);
        }
    }
    return (
        <div className={style.sign}>
            <div className={style.bgLogin}></div>
            <div>
                {succes && <SuccessModal value='Login feito com sucesso' where='main'/>}
                <div className={style.form}>
                    <h1>Entrar</h1>
                    <form onSubmit={submit}>
                        <input value={email} onChange={(e) => Setemail(e.target.value)} type="text" placeholder="Phone ou email" />
                        <input value={password} onChange={(e) => Setpassword(e.target.value)} type="password" placeholder="*************" />
                        <button type='submit' disabled={loading}>Entrar {loading && <ClipLoader color="#36d7b7" size={30} />}</button>
                        <Link to="/signup">Criar conta</Link>
                    </form>     
                </div>
            </div>
        </div>
    );
}

export function SignUp() {
    const [name, setName] = useState<string>("")
    const [email, Setemail] = useState<string>("")
    const [password, Setpassword] = useState<string>("")
    const [succes,setSucces] = useState <boolean> (false)
    const submit = async (e: React.FormEvent) => {

        e.preventDefault()
        try {
             await Api.post("/signup", { name, email, password })
            setSucces(true)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className={style.sign}>
              {succes && <SuccessModal value='Conta criada com sucesso' where='signin'/>}
            <div className={style.bgSignUp}></div>
            <div>
                <div className={style.form}>
                    <h1>Cadastro</h1>
                    <form onSubmit={submit}>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome" required />
                        <input value={email} onChange={(e) => Setemail(e.target.value)} type="email" placeholder='Seu email' required />
                        <input value={password} onChange={(e) => Setpassword(e.target.value)} type="password" placeholder="Sua password" required />
                        <button type='submit'>Cadastrar</button>
                        <Link to="/signin">Ja tenho uma conta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}