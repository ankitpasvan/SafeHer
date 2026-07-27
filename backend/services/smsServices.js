// services/smsService.js
const twilio = require("twilio");

// Twilio credentials come from your .env file (get these from twilio.com console)
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// Sends a single SMS to one phone number
// Used by sosController when an SOS alert is triggered
const sendSMS = async (toPhone, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio-purchased number
      to: toPhone, // must be in E.164 format e.g. +919876543210
    });

    console.log(`SMS sent to ${toPhone}, SID: ${response.sid}`);
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error(`Failed to send SMS to ${toPhone}:`, error.message);
    return { success: false, error: error.message };
  }
};

// Sends the same SOS message to a list of contacts at once
// Used right after creating an SOSAlert, looping through all emergency contacts
const sendSOSAlertToContacts = async (contacts, userName, lat, lng) => {
  const mapLink = `https://maps.google.com/?q=${lat},${lng}`;
  const message = `EMERGENCY ALERT: ${userName} needs help! Their current location: ${mapLink}`;

  // Send all messages in parallel instead of one by one (faster)
  const results = await Promise.all(
    contacts.map((contact) => sendSMS(contact.phone, message)),
  );

  return results;
};

module.exports = { sendSMS, sendSOSAlertToContacts };
