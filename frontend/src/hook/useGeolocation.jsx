import { useCallback, useEffect, useRef, useState } from "react";

// Provides both a one-shot getCurrentPosition() and an optional watch mode.
export function useGeolocation({ watch = false } = {}) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const watchIdRef = useRef(null);

  const handleSuccess = useCallback((pos) => {
    setPosition({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      accuracy: pos.coords.accuracy,
    });
    setError(null);
    setLoading(false);
  }, []);

  const handleError = useCallback((err) => {
    setError(err.message || "Unable to retrieve your location");
    setLoading(false);
  }, []);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this device");
      return Promise.reject(new Error("Geolocation not supported"));
    }
    setLoading(true);
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          };
          handleSuccess(pos);
          resolve(coords);
        },
        (err) => {
          handleError(err);
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 },
      );
    });
  }, [handleSuccess, handleError]);

  useEffect(() => {
    if (!watch || !navigator.geolocation) return undefined;

    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true, maximumAge: 5000 },
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [watch, handleSuccess, handleError]);

  return { position, error, loading, getCurrentPosition };
}
