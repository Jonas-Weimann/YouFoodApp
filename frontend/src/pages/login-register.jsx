import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LoginForm } from "@/components/auxiliars/login-form"
import { RegisterForm } from "@/components/auxiliars/register-form"

const LOGIN_STATE = "Iniciar Sesión"
const REGISTER_STATE = "Registrarse"

export const LoginRegister = () => {
    const [action, setAction] = useState(LOGIN_STATE);

    

    const toggleAction = () => {
        setAction(prev => prev === LOGIN_STATE ? REGISTER_STATE : LOGIN_STATE)
    }

    const buttonText = action === LOGIN_STATE ? REGISTER_STATE : LOGIN_STATE

    return <main className="w-screen h-screen relative bg-(--background)">
        <aside className="bg-(--accent) opacity-15 bg-[url(/src/assets/bg-login.jpg)] w-1/2 h-full ">
            <img src="/src/assets/logo_yf_texto.png" alt="YouFood"  className="aspect-auto absolute bottom-0 right-0 w-1/3"/>
        </aside>
        <section className=" w-1/2 h-full absolute top-0 right-0">
            <Button 
            onClick={toggleAction} 
            className={'absolute w-auto h-10 cursor-pointer top-4 right-4 md:top-8 md:right-8 hover:bg-(--background-dimmed) text-(--text)'}>
                {buttonText}
            </Button>
            <div className="flex items-center justify-center size-full">
                <div key={action} className="animate-(--animation-fade-in) w-full flex items-center justify-center">
                    {action == LOGIN_STATE? <LoginForm /> : <RegisterForm/>}
                </div>
            </div>
        </section>
    </main>
}