import { NavLink } from "react-router";
import CardSearch from "../atoms/cardSearch";

export default function NotFoundPage(){

    return(
        <main className="min-h-[67vh] flex flex-col items-center max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4">
        <CardSearch>
        <h2>PAGE NOT FOUND 404</h2>
        <p>Gå tillbaka till <NavLink to= "/">
                startsidan
            </NavLink>  </p>        
        </CardSearch>
        </main>
    );
};