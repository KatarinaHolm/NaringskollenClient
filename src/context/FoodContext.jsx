import { useState, createContext } from "react";
import { search } from "../services/foodService";

export const FoodContext = createContext();

export function FoodProvider({children}){    
    const [searchList, setSearchList] = useState([]);
    const [chosenFood, setChosenFood] = useState({});
    const [chosenFoodData, setChosenFoodData] = useState({});    

    async function getSearchList(query){
        try{
            const foodResults = await search(query);
            setSearchList(foodResults);
            console.log(foodResults);
        }
        catch(error){
            console.log("Error fetching food suggestions: ", error);
        }
    }

    return(
        <FoodContext.Provider value={{setChosenFoodData, searchList, getSearchList, chosenFood, setChosenFood, chosenFoodData}} >
            {children}
        </FoodContext.Provider>
    )

}
