import { NavLink } from "react-router"

export default function Footer(){
    
    // hide navlink when admin is logged in 

    return(
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
    <aside className="grid-flow-col items-center">
    {/* bild? */}
        <p>Innehåller data från Livsmedelsverkets Livsmedelsdatabas (version [20260701]), licensierad under CC BY 4.0. Oxalatdata från Oxalosis & Hyperoxaluria Foundation, Harvard, Swan Urology, Sally Norton samt publicerade studier (Nguyễn & Savage 2013, Attalla m.fl. 2014 m.fl.). </p>
    </aside>
    <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <NavLink to= "/login">
            Admin
        </NavLink>            
    </nav>
    </footer>
    )
}
