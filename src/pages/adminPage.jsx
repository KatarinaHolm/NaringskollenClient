import { useState, useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import Card from "../atoms/card";
import FoodDataView from "../components/foodDataView";
import SearchFieldAdmin from "../components/searchFieldAdmin";
import EditFood from "../components/editFood";
import ButtonSecondary from "../atoms/buttonSecondary";

export default function AdminPage() {
  // Component states
  const [cardMode, setCardMode] = useState("view"); // view || edit
  const [isCardVisible, setIsCardVisible] = useState(false); // true || false

  //Data variables
  const { foodReferenceData } = useContext(FoodContext);
  const referenceFields = [
    { key: "oxalate", label: "Oxalat (mg)", type: "number" },
    { key: "kcal", label: "Kalorier (kcal)", type: "number", disabled: "true" },
    { key: "fat", label: "Fett (g)", type: "number", disabled: "true" },
    { key: "protein", label: "Protein (g)", type: "number", disabled: "true" },
    {
      key: "carbohydrate",
      label: "Kolhydrater (g)",
      type: "number",
      disabled: "true",
    },
    { key: "fiber", label: "Fibrer (g)", type: "number", disabled: "true" },
    {
      key: "totalSugar",
      label: "Total mängd socker (g)",
      type: "number",
      disabled: "true",
    },
    {
      key: "saturatedFat",
      label: "Mättat fett (g)",
      type: "number",
      disabled: "true",
    },
    {
      key: "monounsaturatedFat",
      label: "Enkelomättat fett (g)",
      type: "number",
      disabled: "true",
    },
    {
      key: "polyunsaturatedFat",
      label: "Fleromättat fett (g)",
      type: "number",
      disabled: "true",
    },   
  ];

   //Select Category Options
  const categories = [
    { value: "1", label: "Grönsaker, potatis & rotfrukter" },
    { value: "2", label: "Frukt & bär" },
    { value: "3", label: "Bröd, pasta & gryn" },
    { value: "4", label: "Nötter, frön & baljväxter" },
    { value: "5", label: "Kött, fågel & chark" },
    { value: "6", label: "Fisk & skaldjur" },
    { value: "7", label: "Ägg, mejeri & växtbaserat" },
    { value: "8", label: "Fetter & oljor" },
    { value: "9", label: "Färdiga rätter, såser & snabbmat" },
    { value: "10", label: "Sötsaker, snacks & bakverk" },
    { value: "11", label: "Drycker" },
    { value: "12", label: "Skafferi, smaksättare & kryddor" },
  ];

   //Select Unit Options
  const specialUnitOptions = [
    { value: 0, label: "styck" },
    { value: 1, label: "skiva" },
    { value: 2, label: "dl" },
  ];

  //Create variables
//   const createFields = {
//   name: "",
//   categoryId: "",
//   kcal: "",
//   fat: "",
//   protein: "",
//   carbohydrate: "",
//   fiber: "",
//   totalSugar: "",
//   oxalate: "",
//   saturatedFat: "",
//   monounsaturatedFat: "",
//   polyunsaturatedFat: "",
//   foodMeasurements: [],
// };

  //Handling card
  function handleSearchSuccess() {
    setCardMode("view");
    setIsCardVisible(true);
  }

  function onCloseClick() {
    setIsCardVisible(false);
  }

  // For Edit mode
  function handleBackClick() {
    setCardMode("view");
  }

  function handleEditSuccess(){
    setCardMode("view");
  };

  function handleDeleteClick() {
    // IMPLEMENT!!
  }
  

  return (
    <>
      <h2>Inloggad admin</h2>
      <SearchFieldAdmin onSearchSucess={handleSearchSuccess} />

      {/* If search is made and results found */}
      {isCardVisible ? (
        <Card onCloseClick={onCloseClick} onBackClick={cardMode === "edit" ? handleBackClick : undefined}>
          {cardMode === "view" && (
            <>
              <FoodDataView
                title={foodReferenceData.name}
                subtitle="Näringsvärden per 100 gram"
                fields={referenceFields}
                foodData={foodReferenceData}
              />

              <ButtonSecondary
                text="Ta bort"
                onClick={handleDeleteClick}
                type="button"
              />
              <ButtonSecondary
                text="Redigera"
                onClick={() => setCardMode("edit")}
                type="button"
              />
            </>
          )}

          {cardMode === "edit" && (
            <EditFood
              title="Redigera livsmedel - "
              subtitle="Näringsvärden per 100 gram"
              fields={referenceFields}
              categories={categories} 
              specialUnitOptions={specialUnitOptions}
              foodData={foodReferenceData}
              onEditSuccess={handleEditSuccess}
            />
          )}
        </Card>
      ) : null}
    </>
  );
}
