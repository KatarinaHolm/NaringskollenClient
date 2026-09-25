import { useFoodForm } from "../hooks/useFoodForm";
import { createFood } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import { useContext, useState } from "react";
import InputField from "../atoms/inputField";
import Select from "../atoms/select";
import ButtonSecondary from "../atoms/buttonSecondary";
import FoodDataView from "./foodDataView";

export default function AddFood({
  title,
  subtitle,
  fields,
  categories,
  specialUnitOptions,
  initialFoodData,  
}) {
  const { setFoodReferenceData, foodReferenceData } = useContext(FoodContext);
  const { currentData, handleChange, handleMeasurementChange } =
    useFoodForm(initialFoodData);
  const [mode, setMode] = useState("create"); // create || viewCreated

   // if time: add check that name doesnt exist in database.

  async function handleSubmit(e) {
    e.preventDefault();    
   
    try {
        //Transforming empty string to null to prevent database error.
      const normalizedData = JSON.parse(
        JSON.stringify(currentData, (_, value) =>
          value === "" ? null : value,
        ),
      );

      //check if unit or grams is null, then update foodmeasurement to empty array
      const measurement = normalizedData.foodMeasurements[0];
      const foodToCreate = {
        ...normalizedData,
        foodMeasurements:
          measurement.grams === null || measurement.unit === null
            ? []
            : normalizedData.foodMeasurements,
      };

      const results = await createFood(foodToCreate);
      setFoodReferenceData(results);
      setMode("viewCreated");

    } catch (error) {
      console.log("Error updating nutrition data:", error);
    }
  }

  return (
    <>
      {mode === "create" && (
        <>
          <h3>{title}</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              name="name"
              label="Livsmedelsnamn"
              type="text"
              placeholder="Livsmedelsnamn"
              value={currentData.name}
              onChange={handleChange}
              required
            />
            <Select
              label="Kategori"
              placeholder="Kategori"
              name="categoryId"
              value={currentData.categoryId}
              onSelectChange={handleChange}
              options={categories}
              required
            />

            <h4>{subtitle}</h4>
            {fields.map((field) => {
              let value = currentData?.[field.key];

              return (
                <InputField                
                  name={field.key}
                  key={field.key}                    
                  label={field.label}
                  type={field.type}
                  placeholder={field.label}
                  value={value}
                  onChange={handleChange}
                  required={field.required}
                />
              );
            })}

            <h4>Måttenheter - vikt per enhet</h4>
            <div>
              <InputField
                name="grams"
                label="Vikt (g)"
                type="number"
                placeholder="Vikt (g)"
                value={currentData.foodMeasurements[0].grams}
                onChange={(e) => handleMeasurementChange(0, e)}
              />
              <Select
                label="Enhet"
                placeholder="Enhet"
                name="unit"
                value={currentData.foodMeasurements[0].unit}
                onSelectChange={(e) => handleMeasurementChange(0, e)}
                options={specialUnitOptions}
              />
            </div>
            <ButtonSecondary text="Lägg till livsmedel" type="submit" />
          </form>
        </>
      )}

      {mode === "viewCreated" && (
        <FoodDataView
          title={`Sparat livsmedel: ${foodReferenceData.name}`}
          subtitle="Näringsvärden per 100 gram"
          fields={fields}
          foodData={foodReferenceData}
        />
      )}
    </>
  );
}
