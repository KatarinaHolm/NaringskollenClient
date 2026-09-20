import { useState, useContext } from "react";
import Card from "../atoms/card";
import FoodDataView from "../components/foodDataView";
import SearchFieldAdmin from "../components/searchFieldAdmin";
import { FoodContext } from "../context/FoodContext";

export default function AdminPage(){
    // Component states
    // const [cardMode, setCardMode] = useState("view"); // view || edit
    const [isCardVisible, setIsCardVisible] = useState(false); // true || false

    //Data variables
    const {foodReferenceData} = useContext(FoodContext);
    const referenceFields = [  
  { key: "oxalate", label: "Oxalat (mg)" },
  { key: "kcal", label: "Kalorier (kcal)" },
  { key: "fat", label: "Fett (g)" },
  { key: "protein", label: "Protein (g)" },
  { key: "carbohydrate", label: "Kolhydrater (g)" },
  { key: "fiber", label: "Fibrer (g)" },
  { key: "totalSugar", label: "Total mängd socker (g)" },
  { key: "saturatedFat", label: "Mättat fett (g)" },
  { key: "monounsaturatedFat", label: "Enkelomättat fett (g)" },
  { key: "polyunsaturatedFat", label: "Fleromättat fett (g)" },  
  { key: "category", label: "Kategori" },
  { key: "externalId", label: "Livsmedelsnummer hos Livsmedelsverket"},  
  { key: "isSystem", label: "Egendefinierat livsmedel" },
  { key: "foodMeasurements", label: "Måttenheter", },
];

    function handleSearchSuccess(){
        setIsCardVisible(true);
    }

    function onCloseClick(){
        setIsCardVisible(false);
    };

    return(
        <>
        <h2>Inloggad admin</h2>
        <SearchFieldAdmin onSearchSucess={handleSearchSuccess} />

        {/* If search is made and results found */}
        {isCardVisible ? (
            <Card onCloseClick={onCloseClick}>
            <FoodDataView 
            title={foodReferenceData.name}
            subtitle="Näringsvärden per 100 gram"
            fields={referenceFields}
            foodData={foodReferenceData}
            />
        </Card>
        ) : (null)
    }
        
        </>
    )
}