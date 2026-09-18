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

        let isCurrent = true;

        const debounceDelay = setTimeout(async () => {
            const results = await getSearchList(searchQuery);

            if(isCurrent){
                setSearchResults(results);
        
            }

        }, 300);

        return () => {
            isCurrent = false;
            clearTimeout(debounceDelay);
        };
    }, [searchQuery, getSearchList]);

    return {searchResults, setSearchResults}
}
