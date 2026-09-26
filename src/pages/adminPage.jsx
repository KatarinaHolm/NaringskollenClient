import { useState, useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import { referenceFields, categories, specialUnitOptions, createFood, createFields, } from "../constants/referenceData";
import { deleteFood } from "../services/foodService";
import Card from "../atoms/card";
import AddFood from "../components/addFood";
import FoodDataView from "../components/foodDataView";
import SearchFieldAdmin from "../components/searchFieldAdmin";
import EditFood from "../components/editFood";
import ButtonSecondary from "../atoms/buttonSecondary";
import Modal from "../atoms/modal";

export default function AdminPage() {
  // Component states
  const [mode, setMode] = useState("view"); // view || edit || create
  const [isFoodCardVisible, setIsFoodCardVisible] = useState(false); // true || false

  //Food data variables
  const { foodReferenceData , setFoodReferenceData } = useContext(FoodContext);

  //Handling card
  function handleSearchSuccess() {
    setMode("view");
    setIsFoodCardVisible(true);
  }

  function onFoodCardCloseClick() {
    setIsFoodCardVisible(false);
  }

  function onCreateCardCloseClick() {
    setMode("view");
  }

  // For Edit mode
  function handleBackClick() {
    setMode("view");
  }

  function handleEditSuccess() {
    setMode("view");
  }

  async function handleDeleteClick() {
    try {
      await deleteFood(foodReferenceData.id);
      setFoodReferenceData(undefined);
      setIsFoodCardVisible(false);
    } catch (error) {
      console.log("Error updating nutrition data:", error);
    }
  }

  return (
    <main>
      <h2>Inloggad admin</h2>
      {mode !== "create" && (
        <SearchFieldAdmin onSearchSucess={handleSearchSuccess} />
      )}

      {mode !== "create" && !isFoodCardVisible && (
        <ButtonSecondary
          text="Lägg till livsmedel"
          onClick={() => setMode("create")}
          type="button"
        />
      )}

      {mode === "create" && (
        <Card onCloseClick={onCreateCardCloseClick}>
          <AddFood
            title="Lägg till nytt livsmedel"
            subtitle="Näringsvärden per 100 gram"
            fields={createFields}
            initialFoodData={createFood}
            categories={categories}
            specialUnitOptions={specialUnitOptions}
          />
        </Card>
      )}

      {/* If search is made and results found */}
      {isFoodCardVisible && (
        <Card
          onCloseClick={onFoodCardCloseClick}
          onBackClick={mode === "edit" ? handleBackClick : undefined}
        >
          {mode === "view" && (
            <>
              <FoodDataView
                title={foodReferenceData.name}
                subtitle="Näringsvärden per 100 gram"
                fields={referenceFields}
                foodData={foodReferenceData}
              />

              <Modal
                title={foodReferenceData.isSystem ? "Radera livsmedel?" : "Livsmedel hämtat från Livsmedelsdatabasen"}
                text={foodReferenceData.isSystem ?
                    `Vill du radera ${foodReferenceData.name}?`
                    : `${foodReferenceData.name} går inte att radera.`
                }
                openModalButtonText="Radera"
                showConfirmButton={foodReferenceData.isSystem}
                confirmButtonText="Radera"
                handleConfirmButtonClick={handleDeleteClick}
              />

              <ButtonSecondary
                text="Redigera"
                onClick={() => setMode("edit")}
                type="button"
              />
            </>
          )}

          {mode === "edit" && (
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
      )}
    </main>
  );
}
