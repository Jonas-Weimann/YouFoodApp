import { UserAuthForm } from "../auth/user-auth-form"

export const LoginForm = () => {
    return <div className="mx-auto flex w-2/5 flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight text-(--text)">
                        Ingresa a tu cuenta
                    </h1>
                    <p className="text-md text-(--accent-foreground)">
                        Ingresa tu email para ingresar a tu cuenta
                    </p>
                    </div>
                    <UserAuthForm action="Iniciar Sesión"/>
            </div>
}