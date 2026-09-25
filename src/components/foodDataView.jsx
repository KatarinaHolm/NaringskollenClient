
export default function FoodDataView({
  title,
  subtitle,
  fields,
  foodData,  
}) {
  return (
    <>
      <h3>{title}</h3>
      <p><strong>Kategori:</strong> {foodData.category}</p>

      {!foodData.isSystem && (
        <p><strong>Livsmedelsnummer hos Livsmedelsverket:</strong> {foodData.externalId}</p>
      )}

      {foodData.foodMeasurements.length > 0 && (
         <div>
            <h4>Måttenheter - vikt per enhet</h4>
            <ul>
              {foodData.foodMeasurements.map((item) => (                
                <li key={item.id}>1 {item.unit}: {item.grams} gram</li>
              ))}
            </ul>
          </div>
      )}
      
      <h4>{subtitle}</h4>
      {fields.map((field) => {
        let value = foodData?.[field.key];
        if (value === null || value === undefined ) return;

        return  (
          <p key={field.key}>
            <strong>{field.label}:</strong>
            {" " + value}
          </p>
        )         
      })}       
    </>
  );
}
