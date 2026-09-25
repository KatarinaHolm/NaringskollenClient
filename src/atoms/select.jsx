export default function Select({
  label,
  placeholder,
  name,
  value,
  onSelectChange,
  options,
  required
}) {
  return (
    <fieldset>
      <label htmlFor="select" className="label">
        {label}
        {required && <span className="required"> *</span>}
      </label>
      <select
        id="select"
        name={name}
        value={value}
        onChange={onSelectChange}
        className="select"
        required= {required}
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
