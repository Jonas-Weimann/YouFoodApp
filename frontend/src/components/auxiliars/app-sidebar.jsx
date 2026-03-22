import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  CircleDollarSign, 
  CreditCard, 
  Landmark, 
  FileText, 
  UtensilsCrossed, 
  Contact, 
  ChefHat,
  UserRound 
} from "lucide-react"

const secciones = [
  {
    nombre: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard
  },
  {
    nombre: 'Ventas',
    url: '/ventas',
    icon: CircleDollarSign
  },
  {
    nombre: 'Compras',
    url: '/compras',
    icon: CreditCard
  },
  {
    nombre: 'Finanzas',
    url: '/finanzas',
    icon: Landmark
  },
  {
    nombre: 'Reportes',
    url: '/reportes',
    icon: FileText
  },
  {
    nombre: 'Productos',
    url: '/productos',
    icon: UtensilsCrossed
  },
  {
    nombre: 'Clientes',
    url: '/clientes',
    icon: Contact
  },
  {
    nombre: 'Equipo',
    url: '/equipo',
    icon: ChefHat
  }
]

export const AppSidebar = () => {
  return (
    <Sidebar className={'border-(--accent)'}>
      
      <SidebarHeader className="p-3 pt-15 bg-(--background) absolute top-23">
          <span className="font-semibold text-sm text-(--accent-foreground) -mb-3 mt-7">Secciones</span>
      </SidebarHeader>

      <SidebarContent className={' bg-(--background) text-(--text) flex flex-col justify-center align-middle'}>
        <SidebarMenu className={'p-2 gap-3'}>
          {secciones.map((seccion) => (
            <SidebarMenuItem key={seccion.nombre} className={'p-2 font-medium hover:bg-(--background-light) hover:rounded-xl'}>
              <SidebarMenuButton tooltip={seccion.nombre}>
                  <seccion.icon />
                  <span className="text-lg">{seccion.nombre}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="pt-3 pb-3 w-full self-center text-xl bg-(--background) border-t-2 border-(--accent) flex align-middle justify-center flex-row">
        <UserRound className="text-2xl text-(--background-light) bg-(--accent) rounded-3xl self-center"/>
        <div className="flex align-middle flex-col">
            <span className="text-base text-(--text)">Jonás Weimann</span>
            <span className="text-xs text-(--text)">jonas.weimann04@gmail.com</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}