import { useState, useContext } from "react";
import { useFoodSelect } from "../hooks/useFoodSelect";
import SearchSelect from "../atoms/searchAutoComplete";
import ButtonPrimary from "../atoms/buttonPrimary";
import { getById } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";

export default function SearchFieldAdmin() {
  //States and objects
  // SearchSelect
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const { searchResults, setSearchResults } = useFoodSelect(searchQuery);
  const { setFoodReferenceData } = useContext(FoodContext);

  //Functions
  //For SearchSelect (search field with autocomplete options)
  function onFoodSelect(food) {
    setSelectedFood(food.id);    
    setSearchQuery(food.name);
    
    setSearchResults([]);
  }

  //For getting complete data for the chosen food
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const results = await getById(selectedFood);
      setFoodReferenceData(results);

    } catch (error) {
      console.log("Error fetching nutrition data:", error);
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit} >
      <SearchSelect
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        results={searchResults}
        onSelect={onFoodSelect}
      />
      <ButtonPrimary
      text="Sök livsmedel"      
      type="submit"
      disabled={false}
      />
      
    </form>
    </>
  );
}
