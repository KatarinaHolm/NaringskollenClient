import { useLocation, useNavigate } from "react-router";
import ButtonSecondary from "../atoms/buttonSecondary";
import { logout } from "../services/AuthService";

export default function Header( ){
  const navigate = useNavigate();
  const location = useLocation();
  const hideAdminBanner = ["/login", "/"];
  const shouldHideBanner = hideAdminBanner.includes(location.pathname);

  async function handleLogoutCLick(e){
    e.preventDefault();
    await logout();
    navigate("/");
  };  

    return(
        <header className="hero bg-base-200 min-h-[33vh]">
          {!shouldHideBanner && (
            <div className="navbar bg-base-100 shadow-sm">
              <p>Inloggad som administratör</p>
              <ButtonSecondary text="Logga ut" onClick={handleLogoutCLick} type="button" />       
            </div>
          )}

        <div className="hero-content text-center">
          <h1 className="text-4xl md:text-6xl font-black">
            Oxalat- och näringskollen
          </h1>
        </div>
      </header>
    )
}