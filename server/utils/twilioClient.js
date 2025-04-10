const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppMessage = async (to, message) => {
    console.log('to, message',to, message)
  try {
    return await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`,
      body: message,
    });
  } catch (error) {
    console.error("WhatsApp Message Error:", error);
    throw new Error("Failed to send WhatsApp message.");
  }
};

module.exports = { sendWhatsAppMessage };
