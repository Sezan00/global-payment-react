import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const Status = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      getSessionData();
    }
  }, [sessionId]);

const getSessionData = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://global-backend.sezan.xyz/api/stripe-session?session_id=${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);
    console.log("Session ID:", sessionId);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      Payment Status Page
      <br />
      Session ID: {sessionId}
    </div>
  );
};

export default Status;