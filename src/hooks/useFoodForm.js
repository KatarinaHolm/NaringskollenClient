import { useState } from "react";

export function useFoodForm(intialData){
      const [currentData, setCurrentData] = useState(intialData);
    
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
    
        setCurrentData((prev) => ({
          ...prev,
          foodMeasurements: prev.foodMeasurements.map(
            (measurement, measurementIndex) =>
              measurementIndex === index
                ? {
                    ...measurement,
                    [name]: Number(value),
                  }
                : measurement,
          ),
        }));
      } 
      return{
        currentData,
        setCurrentData,
        handleChange,
        handleMeasurementChange
      };
}