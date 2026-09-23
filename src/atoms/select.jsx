export default function Select({
  label,
  placeholder,
  name,
  value,
  onSelectChange,
  options,
}) {
  return (
    <fieldset>
      <label htmlFor="select" className="label">
        {label}
      </label>
      <select
        id="select"
        name={name}
        value={value}
        onChange={onSelectChange}
        className="select"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
