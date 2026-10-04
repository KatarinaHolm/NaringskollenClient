import { useFoodForm } from "../hooks/useFoodForm";
import { updateFood, updateFoodMetadata } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import { useContext, useState } from "react";
import InputField from "../atoms/inputField";
import Select from "../atoms/select";
import ButtonSecondary from "../atoms/buttonSecondary";
import FoodMeasurementRow from "./foodMeasurementRow";

export default function EditFood({
  title,
  subtitle,
  fields,
  categories,
  specialUnitOptions,
  foodData,
  onEditSuccess,
}) {
  const {
    currentData,
    handleChange,
    handleMeasurementChange,
    addMeasurement,
    removeMeasurement,
  } = useFoodForm(foodData);
  const { setFoodReferenceData } = useContext(FoodContext);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const units = currentData.foodMeasurements.map((measurement) => measurement.unit);
    if (new Set(units).size !== units.length) {
      setFormError("Samma måttenhet får bara läggas till en gång.");
      return;
    }

    const foodMeasurements = currentData.foodMeasurements.map((measurement) => ({
      ...(measurement.id != null ? { id: measurement.id } : {}),
      unit: measurement.unit,
      grams: Number(measurement.grams),
    }));

    const updateMetadata = {
      oxalate: currentData.oxalate,
      categoryId: currentData.categoryId,
      foodMeasurements,
    };

    const foodToUpdate = {
      ...currentData,
      foodMeasurements,
    };

    try {
      const results = currentData.isSystem
        ? await updateFood(currentData.id, foodToUpdate)
        : await updateFoodMetadata(currentData.id, updateMetadata);

      setFoodReferenceData(results);
      onEditSuccess();
    } catch (error) {
      setFormError(error.response?.data?.detail || "Det gick inte att spara ändringarna.");
    }
  }

  const usedUnits = currentData.foodMeasurements.map((measurement) => measurement.unit);

  return (
    <>
      <h2 className="card-title">
        {title}
        {currentData.name}
      </h2>
      <form onSubmit={handleSubmit}>
        <Select
          label="Kategori"
          placeholder="Kategori"
          name="categoryId"
          value={currentData.categoryId}
          onSelectChange={handleChange}
          options={categories}
        />
        {!currentData.isSystem && (
          <InputField
            name="externalId"
            label="Livsmedelsnummer hos Livsmedelsverket"
            type="number"
            placeholder="Livsmedelsnummer hos Livsmedelsverket"
            value={currentData.externalId}
            disabled
          />
        )}

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
        {currentData.foodMeasurements.length === 0 && (
          <p className="mt-2">Inga måttenheter finns sparade.</p>
        )}
        <button
          className="btn btn-outline btn-sm md:btn-md mt-3 mb-2"
          type="button"
          onClick={addMeasurement}
        >
          Lägg till måttenhet
        </button>

        <h3 className="text-base mt-4 mb-2">{subtitle}</h3>
        {!foodData.isSystem && (
          <p
            className="fieldset-label text-base-content/70 text-xs italic"
            aria-live="polite"
          >
            Data från Livsmedelsdatabasen går inte att ändra.
          </p>
        )}
        {fields.map((field) => (
          <InputField
            key={field.key}
            name={field.key}
            label={field.label}
            type={field.type}
            placeholder={field.label}
            value={currentData[field.key]}
            onChange={handleChange}
            required={field.required}
            disabled={!foodData.isSystem && field.disabled}
          />
        ))}

        {formError && <p className="mt-3 text-error" role="alert">{formError}</p>}
        <ButtonSecondary text="Spara ändringar" type="submit" />
      </form>
    </>
  );
}
