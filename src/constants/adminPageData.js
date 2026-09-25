
export const referenceFields = [
    { key: "oxalate", label: "Oxalat (mg)", type: "number" },
    { key: "kcal", label: "Kalorier (kcal)", type: "number", disabled: true},
    { key: "fat", label: "Fett (g)", type: "number", disabled: true },
    { key: "protein", label: "Protein (g)", type: "number", disabled: true },
    { key: "carbohydrate", label: "Kolhydrater (g)", type: "number", disabled: true },
    { key: "fiber", label: "Fibrer (g)", type: "number", disabled: true },
    { key: "totalSugar", label: "Total mängd socker (g)", type: "number", disabled: true },
    { key: "saturatedFat", label: "Mättat fett (g)", type: "number", disabled: true },
    { key: "monounsaturatedFat", label: "Enkelomättat fett (g)", type: "number", disabled: true },
    { key: "polyunsaturatedFat", label: "Fleromättat fett (g)", type: "number", disabled: true },
  ];

   //Select Category Options
export const categories = [
    { value: "1", label: "Grönsaker, potatis & rotfrukter" },
    { value: "2", label: "Frukt & bär" },
    { value: "3", label: "Bröd, pasta & gryn" },
    { value: "4", label: "Nötter, frön & baljväxter" },
    { value: "5", label: "Kött, fågel & chark" },
    { value: "6", label: "Fisk & skaldjur" },
    { value: "7", label: "Ägg, mejeri & växtbaserat" },
    { value: "8", label: "Fetter & oljor" },
    { value: "9", label: "Färdiga rätter, såser & snabbmat" },
    { value: "10", label: "Sötsaker, snacks & bakverk" },
    { value: "11", label: "Drycker" },
    { value: "12", label: "Skafferi, smaksättare & kryddor" },
  ];

   //Select Unit Options
export const specialUnitOptions = [
    { value: 0, label: "styck" },
    { value: 1, label: "skiva" },
    { value: 2, label: "dl" },
  ];

//   Create variables
export const createFood = {
  name: "",
  categoryId: "",
  kcal: "",
  fat: "",
  protein: "",
  carbohydrate: "",
  fiber: "",
  totalSugar: "",
  oxalate: "",
  saturatedFat: "",
  monounsaturatedFat: "",
  polyunsaturatedFat: "",
  foodMeasurements: [
    {
    grams: "",
    unit: ""
  }
  ],
};

export const createFields = [  
  { key: "oxalate", label: "Oxalat (mg)", type: "number" },
  { key: "kcal", label: "Kalorier (kcal)", type: "number", required: true },
  { key: "fat", label: "Fett (g)", type: "number", required: true },
  { key: "protein", label: "Protein (g)", type: "number", required: true },
  { key: "carbohydrate", label: "Kolhydrater (g)", type: "number", required: true },
  { key: "fiber", label: "Fibrer (g)", type: "number", required: true },
  { key: "totalSugar", label: "Total mängd socker (g)", type: "number", required: true },
  { key: "saturatedFat", label: "Mättat fett (g)", type: "number" },
  { key: "monounsaturatedFat", label: "Enkelomättat fett (g)", type: "number" },
  { key: "polyunsaturatedFat", label: "Fleromättat fett (g)", type: "number" },
];