import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

})

//Rename to Search in frontend and backend
export const search = async (query) => {
    const response = await api.get(`food${encodeURIComponent(query)}`);
    return response.data;
};

export const getById = async (id) => {
    const response = await api.get(`food/${id}`);
    return response.data;
}

export const getCalculatedNutrition = async (id, quantity, unit) => {
    const params = new URLSearchParams({        
        quantity : quantity,
        unit: unit
    })
    const response = await api.get(`food/${id}/calculate${params.toString()}`);
    return response.data
}

export const createFood = async (food) => {
    const response = await api.post(food);
    return response.data;
}

//Update, updateMetadata, Delete, GetCategoriesName


