import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

//Rename to Search in frontend and backend
export const search = async (query) => {
    const response = await api.get(`food?query=${encodeURIComponent(query)}`);
    return response.data;
};

export const getById = async (id) => {
    const response = await api.get(`food/${id}`);
    console.log(response.data);
    return response.data;
}

export const getCalculatedNutrition = async (id, quantity, unit) => {
    const params = new URLSearchParams({        
        quantity : quantity,
        unit: unit
    })
    const response = await api.get(`food/${id}/calculate?${params.toString()}`);

    console.log(response.data);
    return response.data;
}

export const createFood = async (food) => {
    const response = await api.post(food);
    return response.data; // or dont?
}

export const updateFood = async (id, food) => {
    const response = await api.put(`food/${id}`, food);   
    return response.data; 
}

export const updateFoodMetadata = async (id, food) => {
    const response = await api.patch(`food/${id}`, food);   
    return response.data; 
}

// Delete, GetCategoriesName


