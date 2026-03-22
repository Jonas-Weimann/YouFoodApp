import { UserAuthForm } from "../auth/user-auth-form"

export const RegisterForm = () => {
    return <div className="mx-auto flex w-2/5 flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-(--text)">
                        Crea una cuenta
                    </h1>
                    <p className="text-md text-(--accent-foreground)">
                        Ingresa un email para crear una cuenta
                    </p>
                    </div>
                    <UserAuthForm action="Registrarse"/>
            </div>
}