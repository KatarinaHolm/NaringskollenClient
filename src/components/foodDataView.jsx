
export default function FoodDataView({
  title,
  subtitle,
  fields,
  foodData,  
}) {
  return (
    <div className="mb-4">
      <h2 className="card-title mb-2">{title}</h2>
      <p className="italic"><strong>Kategori:</strong> {foodData.category}</p>

      {!foodData.isSystem &&  foodData.externalId && (
        <p className="italic"><strong>Livsmedelsnummer hos Livsmedelsverket:</strong> {foodData.externalId}</p>
      )}

      {foodData.foodMeasurements && foodData.foodMeasurements.length > 0 && (
         <div>
            <h3 className="text-base mt-4 mb-2">Måttenheter - vikt per enhet</h3>
            <ul>
              {foodData.foodMeasurements.map((item) => (                
                <li key={item.id}><strong>1 {item.unit}:</strong> {item.grams} gram</li>
              ))}
            </ul>
          </div>
      )}
      
      <h3 className="text-base mt-4 mb-2">{subtitle}</h3>
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
    </div>
  );
}
