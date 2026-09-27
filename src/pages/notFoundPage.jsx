import { NavLink } from "react-router";

export default function NotFoundPage(){

    return(
        <main className="min-h-[67vh] max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4">
        <h2>PAGE NOT FOUND 404</h2>
        <p>Gå tillbaka till <NavLink to= "/">
                startsidan
            </NavLink>  </p>        

        </main>
    );
};