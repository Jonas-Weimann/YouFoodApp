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
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "@/hooks/use-auth"

const secciones = [
  { nombre: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { nombre: 'Ventas', url: '/ventas', icon: CircleDollarSign },
  { nombre: 'Compras', url: '/compras', icon: CreditCard },
  { nombre: 'Finanzas', url: '/finanzas', icon: Landmark },
  { nombre: 'Reportes', url: '/reportes', icon: FileText },
  { nombre: 'Productos', url: '/productos', icon: UtensilsCrossed },
  { nombre: 'Clientes', url: '/clientes', icon: Contact },
  { nombre: 'Equipo', url: '/equipo', icon: ChefHat }
]

export const AppSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuthStore()

  return (
    <Sidebar className={'border-(--accent)'}>
      
      <SidebarHeader className="p-3 pt-15 bg-(--background) absolute top-23">
          <span className="font-semibold text-sm text-(--accent-foreground)">Secciones</span>
      </SidebarHeader>

      <SidebarContent className={'bg-(--background) text-(--text) flex flex-col justify-center align-middle'}>
        <SidebarMenu className={'p-2 gap-3'}>
          {secciones.map((seccion) => {
            const isActive = location.pathname === seccion.url

            return (
              <SidebarMenuItem 
                key={seccion.nombre} 
                className={`p-2 font-medium transition-colors hover:rounded-xl ${
                  isActive 
                    ? 'bg-(--background-light) rounded-xl text-(--accent)' 
                    : 'hover:bg-(--background-light)'
                }`}
              >
                <SidebarMenuButton 
                  tooltip={seccion.nombre} 
                  onClick={() => navigate(seccion.url)}
                  className="cursor-pointer"
                >
                    <seccion.icon className={isActive ? 'text-(--accent-foreground)' : ''} />
                    <span className="text-lg">{seccion.nombre}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="pt-3 pb-3 w-full self-center text-xl bg-(--background) border-t-2 border-(--accent) flex align-middle justify-center flex-row gap-2">
        {user?.icon && user.icon !== 'default' ? (
          <img src={user.icon} alt="Perfil" className="w-8 h-8 rounded-full self-center border border-(--accent)" />
        ) : (
          <UserRound className="text-2xl text-(--background-light) bg-(--accent) rounded-3xl self-center p-1"/>
        )}
        
        <div className="flex align-middle flex-col overflow-hidden">
            <span className="text-base text-(--text) font-semibold truncate">
              {user?.nombre || "Usuario"}
            </span>
            <span className="text-xs text-(--text) opacity-70 truncate">
              {user?.email || "email@youfood.com"}
            </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}