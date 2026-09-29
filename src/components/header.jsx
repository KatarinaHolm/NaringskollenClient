import { useLocation, useNavigate } from "react-router";
import ButtonLogout from "../atoms/buttonLogout";
import { logout } from "../services/AuthService";

export default function Header( ){
  const navigate = useNavigate();
  const location = useLocation();
  
  const shouldshowBanner = location.pathname.startsWith("/admin");

  async function handleLogoutCLick(e){
    e.preventDefault();
    await logout();
    navigate("/");
  };  

    return(
      <>
      <div className="min-h-[33vh] flex flex-col">
      {shouldshowBanner && (
            <div className="navbar bg-base-200 shadow-sm justify-end gap-4 px-4 flex-none">
              <p>Inloggad som administratör</p>
              <ButtonLogout text="Logga ut" onClick={handleLogoutCLick} type="button" />       
            </div>
          )}
        <header className="hero flex-1 min-h-0 bg-base-100/70 backdrop-blur-xs">          
        
        <div className="hero-content text-center">
          <h1 className="font-lucky text-4xl md:text-6xl font-black">
            Oxalat- och näringskollen
          </h1>
        </div>
      </header>
      </div>
      </>
    )
}