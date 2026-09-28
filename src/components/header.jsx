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
      {shouldshowBanner && (
            <div className="navbar bg-base-200 shadow-sm justify-end gap-4 px-4">
              <p>Inloggad som administratör</p>
              <ButtonLogout text="Logga ut" onClick={handleLogoutCLick} type="button" />       
            </div>
          )}
        <header className="hero bg-base-100/70 backdrop-blur-xs min-h-[33vh]">          
        <div className="hero-content text-center">
          <h1 className="text-4xl md:text-6xl font-black">
            Oxalat- och näringskollen
          </h1>
        </div>
      </header>
      </>
    )
}