import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/use-auth";
import { useNavigate, Link } from "react-router-dom";

export const Header = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const setLogout = useAuthStore((state) => state.setLogout);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogout(); 
    navigate("/login"); 
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8 bg-(--header) text-(--header-text) border-b-(--header-text) border-b-2">
        
        <div className="flex lg:flex-1">
          <Link to="/dashboard" className="-m-2 p-1 flex items-center justify-between gap-2">
            <img src="/src/assets/logo_yf_texto.png" alt="YouFood" className="w-auto h-8" />
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-1.5">
          {!isAuth && (
            <>
              <Button 
                onClick={() => navigate("/login")}
                className={'p-3 bg-(--header-text) text-(--header) font-sans cursor-pointer text-sm font-semibold'}
              >
                Iniciar Sesión
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                className={'p-3 bg-(--header) text-(--header-text) border-(--header-text) border-2 font-sans cursor-pointer text-sm font-semibold'}
              >
                Registrarse
              </Button>
            </>
          )}

          {isAuth && (
            <Button 
              onClick={handleLogout}
              className={'p-3 bg-(--header) text-(--header-text) border-(--header-text) border-2 font-sans cursor-pointer text-sm font-semibold hover:bg-(--background-dimmed)'}
            >
              Cerrar Sesión
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};