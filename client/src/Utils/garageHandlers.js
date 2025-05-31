// src/utils/garageHandlers.js
// export const handleViewDetails = (navigate, user, garageId) => {
//   navigate(`/garages/${garageId}`);
// };

 const handleViewDetails = (navigate,garageId) => {
        if (!user) {
          setIsLoginVisible(true);  // Opens the same login popup from Header
          return;
        }
        navigate(`/garages/${garageId}`);
      };



       const handleSendPromotion = async (garageId) => {
        if (!user) {
            setIsLoginVisible(true);
            return;
          }
        try {
        //   const user = JSON.parse(localStorage.getItem("user")) || 'Hi User'; // if login info is stored
        //   const phone = user?.phone || "+918461975062"; // fallback or prefilled number
      
          const response = await axios.post(`http://localhost:9002/api/garages/${garageId}/notify`, {
            // phone,
          });
      
          if (response.status === 200) {
            alert("Promotion sent via WhatsApp! ✅");
          } else {
            alert("Failed to send promotion ❌");
          }
        } catch (error) {
          console.error("Send WhatsApp Promotion Error:", error);
          alert("Something went wrong. Please try again.");
        }
      };
      