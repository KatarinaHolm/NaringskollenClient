import { useFoodForm } from "../hooks/useFoodForm";
import { createFood } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import { useContext, useState } from "react";
import InputField from "../atoms/inputField";
import Select from "../atoms/select";
import ButtonSecondary from "../atoms/buttonSecondary";
import FoodDataView from "./foodDataView";
import FoodMeasurementRow from "./foodMeasurementRow";

export default function AddFood({
  title,
  subtitle,
  fields,
  categories,
  specialUnitOptions,
  initialFoodData,
}) {
  const { setFoodReferenceData, foodReferenceData } = useContext(FoodContext);
  const {
    currentData,
    handleChange,
    handleMeasurementChange,
    addMeasurement,
    removeMeasurement,
  } = useFoodForm(initialFoodData);
  const [mode, setMode] = useState("create");
  const [formError, setFormError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const units = currentData.foodMeasurements.map((measurement) => measurement.unit);
    if (new Set(units).size !== units.length) {
      setFormError("Samma måttenhet får bara läggas till en gång.");
      return;
    }

    try {
      const foodFields = Object.fromEntries(
        Object.entries(currentData).filter(([key]) => key !== "foodMeasurements"),
      );
      const normalizedFoodFields = JSON.parse(
        JSON.stringify(foodFields, (_, value) => value === "" ? null : value),
      );

      const foodToCreate = {
        ...normalizedFoodFields,
        foodMeasurements: currentData.foodMeasurements.map((measurement) => ({
          unit: measurement.unit,
          grams: Number(measurement.grams),
        })),
      };

      const results = await createFood(foodToCreate);
      setFoodReferenceData(results);
      setMode("viewCreated");
    } catch (error) {
      setFormError(error.response?.data?.detail || "Det gick inte att spara livsmedlet.");
    }
  }

  const usedUnits = currentData.foodMeasurements.map((measurement) => measurement.unit);

  return (
    <>
      {mode === "create" && (
        <>
          <h2 className="card-title">{title}</h2>
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

            <h3 className="text-base mt-4">{subtitle}</h3>
            {fields.map((field) => (
              <InputField
                name={field.key}
                key={field.key}
                label={field.label}
                type={field.type}
                placeholder={field.label}
                value={currentData[field.key]}
                onChange={handleChange}
                required={field.required}
              />
            ))}

            <h3 className="text-base mt-4">Måttenheter – vikt per enhet</h3>
            {currentData.foodMeasurements.map((measurement, index) => (
              <FoodMeasurementRow
                key={measurement._rowKey}
                measurement={measurement}
                index={index}
                options={specialUnitOptions}
                usedUnits={usedUnits}
                onChange={handleMeasurementChange}
                onRemove={removeMeasurement}
              />
            ))}
            <button
              className="btn btn-outline btn-sm md:btn-md mt-3 mb-2"
              type="button"
              onClick={addMeasurement}
            >
              Lägg till måttenhet
            </button>

            {formError && <p className="mt-3 text-error" role="alert">{formError}</p>}
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
