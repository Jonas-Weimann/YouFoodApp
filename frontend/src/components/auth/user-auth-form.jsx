import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

export function UserAuthForm({...props}) {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  if (props.action =="Iniciar Sesión"){
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
              placeholder="nombre@dominio.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />
          </Field>
          <Field>
            <Button 
              disabled={isLoading}
              className={'bg-(--accent) text-(--background) h-10 text-md hover:bg-(--accent-dimmed) cursor-pointer '}
            >
              {isLoading && <Spinner />}
              Iniciar Sesión
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldSeparator className={'text-(--accent-foreground) text-md'}>O continúa con</FieldSeparator>
      <Button variant="outline" type="button" disabled={isLoading} className={'cursor-pointer border border-(--accent) h-10 text-md text-semibold text-(--accent) hover:bg-(--background-dimmed)'}>
        {isLoading ? <Spinner /> :  <img src="/src/assets/logo_google.svg" alt="-" className="mr-2 h-4 w-4" />}{" "}
        Google
      </Button>
    </div>
  )
  } else {
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
              placeholder="nombre@dominio.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="Contraseña"
              type="password"
              className={'bg-(--background-light) text-base md:text-base file:text-base text-(--text) placeholder:text-base h-10'}
              disabled={isLoading}
            />
          </Field>
          <Field>
            <Button 
              disabled={isLoading}
              className={'bg-(--accent) text-(--background) h-10 text-md hover:bg-(--accent-dimmed) cursor-pointer '}
            >
              {isLoading && <Spinner />}
              Registrarse
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldSeparator className={'text-(--accent-foreground) text-md'}>O continúa con</FieldSeparator>
      <Button variant="outline" type="button" disabled={isLoading} className={'cursor-pointer border border-(--accent) h-10 text-md text-semibold text-(--accent) hover:bg-(--background-dimmed)'}>
        {isLoading ? <Spinner /> :  <img src="/src/assets/logo_google.svg" alt="-" className="mr-2 h-4 w-4" />}{" "}
        Google
      </Button>
    </div>
  )
  }

  
}