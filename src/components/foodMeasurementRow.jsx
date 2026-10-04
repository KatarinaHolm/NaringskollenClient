import InputField from "../atoms/inputField";
import Select from "../atoms/select";

export default function FoodMeasurementRow({
  measurement,
  index,
  options,
  usedUnits,
  onChange,
  onRemove,
}) {
  const rowId = measurement._rowKey;
  const availableOptions = options.filter(
    (option) => option.value === measurement.unit || !usedUnits.includes(option.value),
  );

  return (
    <div className="mt-3 rounded-box border border-base-300 p-3">
      <InputField
        id={`${rowId}-grams`}
        name="grams"
        label="Vikt (g)"
        type="number"
        placeholder="Vikt (g)"
        value={measurement.grams}
        onChange={(event) => onChange(index, event)}
        required
      />
      <Select
        id={`${rowId}-unit`}
        label="Enhet"
        placeholder="Välj enhet"
        name="unit"
        value={measurement.unit}
        onSelectChange={(event) => onChange(index, event)}
        options={availableOptions}
        required
      />
      <button
        className="btn btn-ghost btn-sm mt-2 text-error"
        type="button"
        onClick={() => onRemove(index)}
        aria-label={`Ta bort omvandling ${measurement.unit || index + 1}`}
      >
        Ta bort omvandling
      </button>
    </div>
  );
}
