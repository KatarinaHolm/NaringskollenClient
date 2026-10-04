import { useState } from "react";

export function useFoodForm(initialData){
      const [currentData, setCurrentData] = useState(() => ({
        ...initialData,
        foodMeasurements: (initialData.foodMeasurements ?? []).map((measurement, index) => ({
          ...measurement,
          _rowKey: measurement.id != null
            ? `saved-${measurement.id}`
            : `initial-${index}`,
        })),
      }));
    
      //Input fields
      function handleChange({ target }) {
        // getting name and value of the fields getting updated through target
        const { name, value } = target;
    
        // the prop in currentData that corresponds with name gets updated
        setCurrentData((prev) => ({
          ...prev,
          [name]: name === "categoryId" ? Number(value) : value,
        }));
      } 
    
      //FoodMeasurements
      function handleMeasurementChange(index, event) {
        const { name, value } = event.target;
        let updatedValue = value;
        if(name === "grams"  && value !== ""){
            updatedValue = Number(value);
        }
    
        setCurrentData((prev) => ({
          ...prev,
          foodMeasurements: prev.foodMeasurements.map(
            (measurement, measurementIndex) =>
              measurementIndex === index
                ? {
                    ...measurement,
                    [name]: updatedValue,
                }
                : measurement,
          ),
        }));
      } 

      function addMeasurement() {
        const newMeasurement = {
          grams: "",
          unit: "",
          _rowKey: `new-${crypto.randomUUID()}`,
        };

        setCurrentData((prev) => ({
          ...prev,
          foodMeasurements: [
            ...prev.foodMeasurements,
            newMeasurement,
          ],
        }));
      }

      function removeMeasurement(index) {
        setCurrentData((prev) => ({
          ...prev,
          foodMeasurements: prev.foodMeasurements.filter((_, rowIndex) => rowIndex !== index),
        }));
      }

      return{
        currentData,
        setCurrentData,
        handleChange,
        handleMeasurementChange,
        addMeasurement,
        removeMeasurement
      };
}
