import { useState, useEffect, useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import SearchSelect from "../atoms/searchAutoComplete";
import QuantityInput from "../atoms/input";
import SelectUnit from "../atoms/select";
import { getCalculatedNutrition, search } from "../services/foodService";

export default function SearchFieldUser() {
  // SearchSelect
  const { getSearchList, searchList } = useContext(FoodContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState({
    id: null,
    units: [],
  });

  // QuantityInput
  const [quantityValue, setQuantityValue] = useState();

  //SelectUnit
  const baseUnitOptions = [
    { value: "g", label: "gram" },
    { value: "kg", label: "kilo" },
  ];
  const [selectUnitOptions, setSelectUnitOptions] = useState(baseUnitOptions);
  const [unitValue, setUnitValue] = useState();

  //For SearchSelect (search field with autocomplete options)
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([]);
      return;
    }

    const debounceDelay = setTimeout(async () => {
      await getSearchList(searchQuery);
      setSearchResults(SearchList);

      return () => clearTimeout;
    }, 300);

    return () => clearTimeout(debounceDelay);
  }, [searchQuery]);

  function onFoodSelect(food) {
    setSelectedFood({
      id: food.id,
      units: food.foodMeasurements.map((fm) => fm.unit),
    });

    setSearchQuery(food.name);

    setSearchResults([]);

    updateUnitOptions(units);
  }

  // Method for quantity input?!!

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
      <SearchSelect />
      <QuantityInput />
      <SelectUnit />
    </>
  );
}
