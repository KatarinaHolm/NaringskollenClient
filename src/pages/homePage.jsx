import { useContext, useState } from "react";
import { FoodContext } from "../context/FoodContext";
import { referenceFields } from "../constants/referenceData";
import SearchFieldUser from "../components/searchFieldUser"
import Card from "../atoms/card";
import FoodDataView from "../components/foodDataView";

export default function HomePage(){ 
   const [isFoodCardVisible, setIsFoodCardVisible] = useState(false); // true || false
   const {calculatedNutritionData} = useContext(FoodContext);

    function handleSearchSuccess(){
        setIsFoodCardVisible(true);
    }

    function onFoodCardCloseClick(){
        setIsFoodCardVisible(false);
    }

    return(
        <main className="min-h-[67vh] max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-4">
        <SearchFieldUser onSearchSucess={handleSearchSuccess}/>
        
        {isFoodCardVisible && (
            <Card onCloseClick={onFoodCardCloseClick}>                  
                <FoodDataView
                title={`${calculatedNutritionData.name} - ${calculatedNutritionData.quantity} ${calculatedNutritionData.unit}`}
                subtitle={`Näringsvärden för ${calculatedNutritionData.quantity} ${calculatedNutritionData.unit}`}
                fields={referenceFields}
                foodData={calculatedNutritionData}
                />
            </Card>

        )}
        </main>
    )
}
