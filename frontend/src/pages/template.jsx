import { Header } from "@/components/structure/header"
import { Asidebar } from "@/components/structure/sidebar"

export const Template = ({ children }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-(--background)">
      <Header />
      <div className="flex flex-1 w-full mt-14.5">
        <Asidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-[url(/src/assets/5338170.svg)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}