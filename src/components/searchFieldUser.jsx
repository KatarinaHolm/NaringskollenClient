import { useContext, useState } from "react";
import { useFoodSelect } from "../hooks/useFoodSelect";
import { getCalculatedNutrition } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import SearchSelect from "../atoms/searchAutoComplete";
import QuantityInput from "../atoms/inputField";
import SelectUnit from "../atoms/select";
import ButtonPrimary from "../atoms/buttonPrimary";


export default function SearchFieldUser({onSearchSucess}) {
//States and objects
  const {setCalculatedNutritionData} = useContext(FoodContext);

  // SearchSelect
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState({
    id: null,
    units: [],
  });
  const { searchResults, setSearchResults } = useFoodSelect(searchQuery);

  // QuantityInput
  const [quantityValue, setQuantityValue] = useState("");

  //SelectUnit
  const baseUnitOptions = [
    { value: "g", label: "gram" },
    { value: "kg", label: "kilo" },
  ];
  const [selectUnitOptions, setSelectUnitOptions] = useState(baseUnitOptions);
  const [unitValue, setUnitValue] = useState("");


//Functions
  //For SearchSelect (search field with autocomplete options)
  function onFoodSelect(food) {
    const units = food.foodMeasurements.map((fm) => fm.unit);

    setSelectedFood({
      id: food.id,
      units
    });

    setSearchQuery(food.name);
    setQuantityValue("");
    setUnitValue("");
    setSearchResults([]);
    updateUnitOptions(units);
  }

  // Updating UnitOptions if food has unit conversions saved in database
  function updateUnitOptions(units) {
    const selectOptions = [
      ...baseUnitOptions,
      ...(units.includes("styck") ? [{ value: "styck", label: "styck" }] : []),
      ...(units.includes("skiva") ? [{ value: "skiva", label: "skiva" }] : []),
      ...(units.includes("dl")
        ? [
            { value: "dl", label: "dl" },
            { value: "msk", label: "msk" },
            { value: "tsk", label: "tsk" },
          ]
        : []),
    ];

    setSelectUnitOptions(selectOptions);
  }

  // Call for getting calculated nutrition
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const results= await getCalculatedNutrition(selectedFood.id, quantityValue, unitValue);
      setCalculatedNutritionData(results);
      setSearchQuery("");
      setQuantityValue("");
      setUnitValue("");
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
        onChange={(e) => setSearchQuery(e.target.value)}
        results={searchResults}
        onSelect={onFoodSelect}
      />
      <QuantityInput 
        label="Mängd"
        type="Number"
        placeholder="Mängd"
        value={quantityValue}
        onChange={(e) => setQuantityValue(e.target.value)}
        name="quantity"
      />
      <SelectUnit 
        label="Enhet"
        placeholder="Enhet"
        name="unit"
        value={unitValue}
        onSelectChange={(e) => setUnitValue(e.target.value)}
        options={selectUnitOptions}
      />
      <ButtonPrimary
            text="Sök livsmedel"      
            type="submit"           
      />
    </form>
    </>
  );
}
