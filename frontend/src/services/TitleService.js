import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getTitles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/titles`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const addTitle = async (data) => {
    try {
        await axios.post(`${BASE_URL}/api/titles`, data);
    } catch (error) {
        return error
    }
}

export const getCount = async () => {
     try {
        const response = await axios.get(`${BASE_URL}/api/titles/top`);
        return response.data;
    } catch (error) {
        return error
    }
}