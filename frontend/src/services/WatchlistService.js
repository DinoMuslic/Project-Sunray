import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWatchlists = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/watchlist`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const addWatchlist = async (data) => {
    try {
        await axios.post(`${BASE_URL}/api/watchlist`, data);
    } catch (error) {
        throw error
    }
}