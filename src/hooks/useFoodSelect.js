import { useState, useEffect, useContext } from "react";
import { FoodContext } from "../context/FoodContext";


export function useFoodSelect(searchQuery, shouldSearch = true){
    const { getSearchList } = useContext(FoodContext);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!shouldSearch || searchQuery === "") {
            setSearchResults([]);
            return;
        }

        let isCurrent = true;

        const debounceDelay = setTimeout(async () => {
            const results = await getSearchList(searchQuery);

            if(isCurrent){
                setSearchResults(results);
        
            }

        }, 400);

        return () => {
            isCurrent = false;
            clearTimeout(debounceDelay);
        };
    }, [searchQuery, shouldSearch, getSearchList]);

    return {searchResults, setSearchResults}
}
