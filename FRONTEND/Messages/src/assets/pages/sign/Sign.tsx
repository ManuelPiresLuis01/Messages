import { Link } from 'react-router-dom';
import style from "./Style.module.css"

export function SignIn() {
    return (
        <div className={style.sign}>
            <div className={style.bgLogin}></div>
            <div>
                <div className={style.form}>
                    <h1>Entrar</h1>
                    <form>
                        <input type="text" placeholder="Phone ou email" />
                        <input type="password" placeholder="*************" />
                        <button type='submit'>Entrar</button>
                        <Link to="/signup">Criar conta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function SignUp() {
    return (
        <div className={style.sign}>
            <div className={style.bgSignUp}></div>
            <div>
                <div className={style.form}>
                    <h1>Cadastro</h1>
                    <form>
                        <input type="text" placeholder="Seu nome" required/>
                        <input type="email" placeholder='Seu email' required/>
                        <input type="password" placeholder="Sua password" required/>
                        <button type='submit'>Cadastrar</button>
                        <Link to="/signin">Ja tenho uma conta</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}