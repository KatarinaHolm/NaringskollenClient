import { useState } from "react";
import { useFoodSelect } from "../hooks/useFoodSelect";
import SearchSelect from "../atoms/searchAutoComplete";
import { getById } from "../services/foodService";

export default function SearchFieldAdmin() {
  //States and objects
  // SearchSelect
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const { searchResults, setSearchResults } = useFoodSelect(searchQuery);

  //Functions
  //For SearchSelect (search field with autocomplete options)
  function onFoodSelect(food) {
    setSelectedFood(food.id);

    setSearchQuery(food.name);
    setSearchResults([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await getById(selectedFood.id);
    } catch (error) {
      console.log("Error fetching nutirtion data:", error);
    }
  }
  return (
    <>
      <SearchSelect
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        results={searchResults}
        onSelect={onFoodSelect}
      />
      //button submit
    </>
  );
}
