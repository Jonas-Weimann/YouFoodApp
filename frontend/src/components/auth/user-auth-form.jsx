import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { toast } from "sonner"

import api from "@/api/api" 
import { useAuthStore } from "@/hooks/use-auth"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google'

const checkPassword = (isLogin) => {
  let password = document.getElementById("password").value;
  let confirmPassword = isLogin ? document.getElementById("password-confirm").value : password;
  let message = document.getElementById("message");
  if (password.length < 8) {
  message.innerHTML =
    "La contraseña debe tener al menos 8 caracteres<br/>";
  message.style.color = "salmon";
  return false;
  }
  if (password !== confirmPassword) {
  message.innerHTML = "Las contraseñas no coinciden<br/>";
  message.style.color = "salmon";
  return false;
  }
  message.innerHTML = "";
  return true;
};

export function UserAuthForm({ action, ...props }) {
  const [isLoading, setIsLoading] = useState(false)
  const setLogin = useAuthStore((state) => state.setLogin)
  const navigate = useNavigate()

  async function onSubmit(event) {
    event.preventDefault()
    if (!checkPassword()) return;
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, payload);
      if(!response) throw new Error(response)
      const { user, token } = response.data; 
      setLogin(user, token);
      toast.success(isLogin ? "¡Bienvenido!" : "Cuenta creada con éxito");
      isLogin ? navigate("/dashboard") : navigate("/login")
    } catch (error) {
        toast.error(error);
        console.error("Error en la petición:", error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const tokenGoogle = credentialResponse.credential
      const { data } = await api.post('/auth/google', { token: tokenGoogle })
      setLogin(data.user, data.token)
      toast.success("Logueo con Google exitoso")
      navigate("/dashboard")
    } catch (error) {
      console.error("Error en el logueo con Google:", error.response?.data || error.message)
      toast.error("Error al iniciar con Google")
    }
  }

  const isLogin = action === "Iniciar Sesión"

    return (
    <div className={("grid gap-6")} {...props}>
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel className="sr-only" htmlFor="email">
              Email
            </FieldLabel>
            <Input
              id="email"
              placeholder="Correo electrónico"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              required
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />
              {!isLogin && <Input
              id="name"
              placeholder="Nombre"
              name="name"
              required
              autoCapitalize="words"
              autoCorrect="off"
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />}
            <Input
              id="password"
              placeholder="Contraseña"
              type="password"
              name="password"
              required
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />
            {!isLogin && <Input
              id="password-confirm"
              placeholder="Confirmar contraseña"
              type="password"
              required
              name="password-confirm"
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />}
          </Field>
          <Field>
            <h2 id="message" className="text-center"></h2>
            <Button 
              type="submit"
              disabled={isLoading}
              className={'bg-(--accent) text-(--background) h-10 text-md hover:bg-(--accent-dimmed) cursor-pointer'}
            >
              {isLoading && <Spinner />}
              {isLogin? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldSeparator className={'text-(--accent-foreground) text-md'}>O también puedes</FieldSeparator>
      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Fallo el login")}
          theme="filled_black"
          shape="pill"
          useOneTap
        />
      </div>
    </div>
  )
}