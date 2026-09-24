import { useFoodForm } from "../hooks/useFoodForm";
import { updateFood, updateFoodMetadata } from "../services/foodService";
import { FoodContext } from "../context/FoodContext";
import { useContext } from "react";
import InputField from "../atoms/inputField";
import Select from "../atoms/select";
import ButtonSecondary from "../atoms/buttonSecondary";

export default function EditFood({
  title,
  subtitle,
  fields,
  categories,
  specialUnitOptions,
  foodData,
  onEditSuccess
}) {
  const { currentData, handleChange, handleMeasurementChange } =
    useFoodForm(foodData);
  const { setFoodReferenceData } = useContext(FoodContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const updateMetadata = {
      oxalate: currentData.oxalate,
      categoryId: currentData.categoryId,
      foodMeasurements: currentData.foodMeasurements,
    };

    try {
      let results = {};
      if (currentData.isSystem) {
        results = await updateFood(currentData.id, currentData);
      } else {
        results = await updateFoodMetadata(currentData.id, updateMetadata);
      }
      setFoodReferenceData(results);
      onEditSuccess();
      
    } catch (error) {
      console.log("Error updating nutrition data:", error);
    }
  }

  return (
    <>
      <h3>
        {title}
        {currentData.name}
      </h3>
      <form onSubmit={handleSubmit}>
        {!foodData.isSystem && (
          <InputField
            name={currentData.externalId}
            label="Livsmedelsnummer hos Livsmedelsverket"
            type="number"
            placeholder="Livsmedelsnummer hos Livsmedelsverket"
            value={currentData.externalId}
            disabled="true"
          />
        )}
        <Select
          label="Kategori"
          placeholder="Kategori"
          name="categoryId"
          value={currentData.categoryId}
          onSelectChange={handleChange}
          options={categories}
        />

        <h4>Måttenheter - vikt per enhet</h4>
        {currentData.foodMeasurements.length > 0 ? (
          currentData.foodMeasurements?.map((measurement, index) => {
            // Setting unit to numeric value
            const currentUnit = specialUnitOptions.find(
              (unit) => unit.label === measurement.unit,
            );

            return (
              <div key={measurement.id ?? index}>
                <InputField
                  name="grams"
                  label="Vikt (g)"
                  type="number"
                  placeholder="Vikt (g)"
                  value={measurement.grams}
                  onChange={(e) => handleMeasurementChange(index, e)}
                />

                <Select
                  label="Enhet"
                  placeholder="Enhet"
                  name="unit"
                  value={currentUnit?.value ?? ""}
                  onSelectChange={(e) => handleMeasurementChange(index, e)}
                  options={specialUnitOptions}
                />
              </div>
            );
          })
        ) : (
          <p>Inga måttenheter finns sparade.</p>
        )}

        <h4>{subtitle}</h4>
        {!foodData.isSystem && (
          <div>
            <p
              className="fieldset-label text-base-content/70 text-xs mt-1"
              aria-live="polite"
            >
              Data från Livsmedelsdatabasen går inte att ändra.
            </p>
          </div>
        )}
        {fields.map((field) => {
          let value = currentData?.[field.key];
          // MAybe set null values to "".
          // if (value === null || value === undefined || value.length === 0) return;

          return (
            <InputField
              name={field.key}
              label={field.label}
              type={field.type}
              placeholder={field.label}
              value={value}
              onChange={handleChange}
              required={field.required}
              disabled={!foodData.isSystem && field.disabled}
            />
          );
        })}
        <ButtonSecondary text="Spara ändringar" type="submit" />
      </form>
    </>
  );
}
