import { useState } from "react";
import { useFoodSelect } from "../hooks/useFoodSelect";
import SearchSelect from "../atoms/searchAutoComplete";
import QuantityInput from "../atoms/input";
import SelectUnit from "../atoms/select";
import { getCalculatedNutrition } from "../services/foodService";


export default function SearchFieldUser() {
//States and objects
  // SearchSelect
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState({
    id: null,
    units: [],
  });
  const { searchResults, setSearchResults } = useFoodSelect(searchQuery);

  // QuantityInput
  const [quantityValue, setQuantityValue] = useState();

  //SelectUnit
  const baseUnitOptions = [
    { value: "g", label: "gram" },
    { value: "kg", label: "kilo" },
  ];
  const [selectUnitOptions, setSelectUnitOptions] = useState(baseUnitOptions);
  const [unitValue, setUnitValue] = useState();


//Functions
  //For SearchSelect (search field with autocomplete options)
  function onFoodSelect(food) {
    setSelectedFood({
      id: food.id,
      units: food.foodMeasurements.map((fm) => fm.unit),
    });

    setSearchQuery(food.name);
    setSearchResults([]);
    updateUnitOptions(selectedFood.units);
  }

  // Function for quantity input?!!

  // Updating UnitOptions if food has unit conversions saved in database
  function updateUnitOptions(units) {
    const selectOptions = [
      ...baseUnitOptions,
      ...(units.includes(0) ? [{ value: "st", label: "styck" }] : []),
      ...(units.includes(1) ? [{ value: "skv", label: "skiva" }] : []),
      ...(units.includes(2)
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
      await getCalculatedNutrition(selectedFood.id, quantityValue, unitValue);
    } catch (error) {
      console.log("Error fetching nutirtion data:", error);
    }
  }

  // Add props to atoms!!

  return (
    <>
    //form
      <SearchSelect
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        results={searchResults}
        onSelect={onFoodSelect}
      />
      <QuantityInput />
      <SelectUnit />
      //button submit
    </>
  );
}
