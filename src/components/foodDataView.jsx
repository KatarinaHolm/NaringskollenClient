
export default function FoodDataView({
  title,
  subtitle,
  fields,
  foodData,  
}) {
  return (
    <>
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      {fields.map((field) => {
        let value = foodData?.[field.key];
        if (value === null || value === undefined || value.length === 0) return;

        return !Array.isArray(value) ? (
          <p key={field.key}>
            <strong>{field.label}:</strong>
            {" " + value}
          </p>
        ) : (
          <div key={field.key}>
            <h4>{field.label}</h4>
            <ul>
              {value.map((item) => (                
                <li key={item.id}>1 {item.unit}: {item.grams} gram</li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
