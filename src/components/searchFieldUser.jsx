import { useContext, useState } from "react";
import { useFoodSelect } from "../hooks/useFoodSelect";
import { getCalculatedNutrition } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import SearchSelect from "../atoms/searchAutoComplete";
import QuantityInput from "../atoms/inputField";
import SelectUnit from "../atoms/select";
import ButtonPrimary from "../atoms/buttonPrimary";
import CardSearch from "../atoms/cardSearch";


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
  const [formError, setFormError] = useState("");

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
    if (!selectedFood?.id) {
      return;
    }
    setFormError("");
    try {
      const results= await getCalculatedNutrition(selectedFood.id, quantityValue, unitValue);
      setCalculatedNutritionData(results);
      setSearchQuery("");
      setQuantityValue("");
      setUnitValue("");
      onSearchSucess();
    } catch (error) {
      setFormError(error.response?.data?.detail || "Det gick inte att beräkna näringsinnehållet.");
    }
  }
 
  return (
    <>
    <CardSearch title="Sök näringsinnehåll">
    <form onSubmit={handleSubmit}>
      <SearchSelect
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSelectedFood(null);}}
        results={searchResults}
        onSelect={onFoodSelect}
      />
      <QuantityInput 
        label="Mängd"
        type="number"
        placeholder="Ange mängd"
        value={quantityValue}
        onChange={(e) => {
          setQuantityValue(e.target.value);
          setFormError("");
        }}
        name="quantity"
        min={0.01}
        max={1000000}
        step={0.01}
        required
      />
      {formError && <p className="mt-3 text-error" role="alert">{formError}</p>}
      <SelectUnit 
        label="Enhet"
        placeholder="Välj enhet"
        name="unit"
        value={unitValue}
        onSelectChange={(e) => {
          setUnitValue(e.target.value);
          setFormError("");
        }}
        options={selectUnitOptions}
      />
      <ButtonPrimary
            text="Sök oxalater & näring"      
            type="submit"           
      />
    </form>
    </CardSearch>
    </>
  );
}
