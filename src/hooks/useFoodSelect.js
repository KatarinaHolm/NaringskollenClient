import { useState, useEffect, useContext } from "react";
import { FoodContext } from "../context/FoodContext";


export function useFoodSelect(searchQuery){
    const { getSearchList } = useContext(FoodContext);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults([]);
            return;
        }

        const debounceDelay = setTimeout(async () => {
        const results = await getSearchList(searchQuery);
        setSearchResults(results);       

        }, 300);

        return () => clearTimeout(debounceDelay);
    }, [searchQuery, getSearchList]); //Förstå problemet, lägga till dependencies

    return {searchResults, setSearchResults}
}
