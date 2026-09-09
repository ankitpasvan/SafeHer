import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:7000";

export function SocketProvider({ children }) {
  const { user } = useContext(AuthContext);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [lastSOSAlert, setLastSOSAlert] = useState(null);
  const [liveLocations, setLiveLocations] = useState({});

  useEffect(() => {
    if (!user?._id) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setConnected(false);
      return;
    }

    const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      // Join a room named after this user's id so contacts can reach them directly
      socket.emit("joinRoom", user._id);
    });

    socket.on("disconnect", () => setConnected(false));

    // Real-time SOS alert from someone who has this user as a trusted contact
    socket.on("sosAlert", (payload) => {
      setLastSOSAlert(payload);
    });

    // Real-time location broadcast from a trusted contact who is sharing
    socket.on("receiveLocation", (payload) => {
      setLiveLocations((prev) => ({ ...prev, [payload.userId]: payload }));
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id]);

  const emitLocationUpdate = (lat, lng, contactIds = []) => {
    socketRef.current?.emit("locationUpdate", {
      userId: user?._id,
      lat,
      lng,
      contactIds,
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        connected,
        lastSOSAlert,
        liveLocations,
        emitLocationUpdate,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
