import axios from "axios";

const API_BASE = "http://localhost:8000/api"

export const getRelations = async ()=>{
    try{
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE}/relations`, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log("API Response", response.data);
        return response.data;
    } catch(error){
        console.log("Error", error)
        throw error;
    }
};


export const getSourceFunds = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE}/sourcefunds`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;

    } catch (error) {
        console.log("Error", error);
        throw error;
    }
};


export const getPurposeTransfer = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE}/purposefunds`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;

    } catch (error) {
        console.log("Error", error);
        throw error;
    }
};