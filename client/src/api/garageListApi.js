import axios from "axios";
const GarageListApiCall = async (latitude, longitude) => {
    try {
      const response = await axios.get('http://localhost:9002/api/garages/nearby', {
        params: {
          latitude: latitude,
          longitude: longitude,
        }
      });
      const result = response.data.garages;
      console.log('inside API', result);
      return result;
    } catch (err) {
      console.error("Error fetching garages:", err);
      return []; // fallback to empty array
    }
  };



export default GarageListApiCall
