import { NavLink } from "react-router";

export default function NotFoundPage(){

    return(
        <main className="min-h-[67vh] container mx-auto px-4">
        <h2>PAGE NOT FOUND 404</h2>
        <p>Gå tillbaka till <NavLink to= "/">
                startsidan
            </NavLink>  </p>        

        </main>
    );
};