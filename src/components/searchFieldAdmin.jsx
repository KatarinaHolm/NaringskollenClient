import { useState, useContext } from "react";
import { useFoodSelect } from "../hooks/useFoodSelect";
import { getById } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import SearchSelect from "../atoms/searchAutoComplete";
import ButtonPrimary from "../atoms/buttonPrimary";

export default function SearchFieldAdmin({ onSearchSucess }) {
  //States and objects
  // SearchSelect
  const [searchQuery, setSearchQuery] = useState("");
  const [shouldSearch, setShouldSearch] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const { searchResults, setSearchResults } = useFoodSelect(searchQuery, shouldSearch);
  const { setFoodReferenceData } = useContext(FoodContext);

  //Functions
  //For SearchSelect (search field with autocomplete options)
  function onFoodSelect(food) {
    setShouldSearch(false);
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
      setSearchQuery("");
      onSearchSucess();
    } catch (error) {
      console.log("Error fetching nutrition data:", error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <SearchSelect
          value={searchQuery}
          onChange={(e) => {
            setShouldSearch(true);
            setSearchQuery(e.target.value);
          }}
          results={searchResults}
          onSelect={onFoodSelect}
        />
        <ButtonPrimary text="Sök livsmedel" type="submit" disabled={false} />
      </form>
    </>
  );
}
