import axios from "axios";
 const GarageListApiCall = async() =>{
    let result = await axios.get('http://localhost:9002/api/garages')
                .then((res)=>{
                    let result = res.data.data.data;
                    console.log('inside API',result)
                    return result

                })
                .catch ((err) => {
                    console.error("Error fetching garages:", err);
                    return []; // fallback to empty array
                })
                return result
}



export default GarageListApiCall
