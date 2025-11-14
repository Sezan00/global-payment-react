import axios from "axios";

const API_BASE = "http://localhost:8000/api"

export const getRelations = async ()=>{
    try{
        const response = await axios.get(`${API_BASE}/relations`);
        // console.log("API Response", response.data);
        return response.data;
    } catch(error){
        console.log("Error", error)
        throw error;
    }
};


 export const getSourceFunds = async () =>{
    try{
        const response = await axios.get(`${API_BASE}/sourcefunds`);
        // console.log("API Response", response.data);
        return response.data;
    } catch(error){
        console.log("Error", error)
        throw error;
    }
 }


 export const getPurposeTransfer = async()=>{
    try{
        const data = await axios.get(`${API_BASE}/purposefunds`);
        // console.log('Purpose Of Transfer:', data)
        return data;
    } catch(error){
        console.log("Error", error)
        throw error;
    }
 }