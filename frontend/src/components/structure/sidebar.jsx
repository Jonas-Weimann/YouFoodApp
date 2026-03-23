import {  SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/auxiliars/app-sidebar"


export const Asidebar = () => {
    return (
        <SidebarProvider className={'mt-14.5 w-auto '}>
            <AppSidebar className={'mt-14.5'}/>
        </SidebarProvider>

    )
}