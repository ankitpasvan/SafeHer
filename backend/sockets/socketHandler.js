// sockets/socketHandler.js

// This function is called once from server.js, passing in the `io` instance
// It sets up all real-time event listeners
const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`New socket connected: ${socket.id}`);

    // 1. When a user logs in on the frontend, they "join a room" named after their userId
    // This lets us send messages to a SPECIFIC user later (not broadcast to everyone)
    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // 2. Live location update — fired repeatedly while a user is sharing their location
    // (e.g. every 5-10 seconds from the frontend using navigator.geolocation.watchPosition)
    socket.on("locationUpdate", ({ userId, lat, lng, contactIds }) => {
      // Broadcast this location to each trusted contact who is also connected
      // Frontend of the contact should be listening for 'receiveLocation'
      contactIds.forEach((contactId) => {
        io.to(contactId).emit("receiveLocation", {
          userId,
          lat,
          lng,
          timestamp: new Date(),
        });
      });
    });

    // 3. Instant SOS broadcast — fired the moment triggerSOS() runs on the backend
    // (this event is emitted from sosController, not directly from the client)
    // Included here as a reference for the event name contacts should listen for:
    // io.to(contactId).emit('sosAlert', { userId, userName, lat, lng, timestamp })

    // 4. Clean up when a user disconnects (closes tab, loses connection)
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = initializeSocket;
