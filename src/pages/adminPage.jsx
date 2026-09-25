import { useState, useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import { referenceFields, categories, specialUnitOptions, createFood, createFields, } from "../constants/adminPageData";
import Card from "../atoms/card";
import FoodDataView from "../components/foodDataView";
import SearchFieldAdmin from "../components/searchFieldAdmin";
import EditFood from "../components/editFood";
import ButtonSecondary from "../atoms/buttonSecondary";

export default function AdminPage() {
  // Component states
  const [cardMode, setCardMode] = useState("view"); // view || edit
  const [isCardVisible, setIsCardVisible] = useState(false); // true || false

  //Food data variables
  const { foodReferenceData } = useContext(FoodContext);  

  //Handling card
  function handleSearchSuccess() {
    setCardMode("view");
    setIsCardVisible(true);
  };

  function onCloseClick() {
    setIsCardVisible(false);
  }

  // For Edit mode
  function handleBackClick() {
    setCardMode("view");
  };

  function handleEditSuccess(){
    setCardMode("view");
  };
 
  function handleDeleteClick() {
    // IMPLEMENT!!
  };  

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
