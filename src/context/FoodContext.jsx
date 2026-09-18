import { useState, createContext, useCallback } from "react";
import { search } from "../services/foodService";

export const FoodContext = createContext();

export function FoodProvider({children}){      
    const [calculatedNutritionData, setCalculatedNutritionData] = useState({});    
    const [foodReferenceData, setFoodReferenceData] = useState();

    const getSearchList = useCallback( async (query) => {
        try{
            const foodResults = await search(query);            
            return foodResults;            
        }
        catch(error){
            console.log("Error fetching food suggestions: ", error);
            return [];
        }
    }, []);

    return(
        <FoodContext.Provider value={{ getSearchList, calculatedNutritionData, setCalculatedNutritionData, foodReferenceData, setFoodReferenceData }} >
            {children}
        </FoodContext.Provider>
    )

}
