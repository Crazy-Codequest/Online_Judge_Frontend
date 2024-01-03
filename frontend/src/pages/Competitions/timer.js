import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

const CompetitionTimer = ({ competitionTimestamp }) => {
  const duration = 3 * 60 * 60 * 1000;
  // Calculate the end time of the competition in IST
  let currentTimeStamp = new Date(competitionTimestamp).getTime();
  let endTimeIST = new Date(currentTimeStamp + duration).toLocaleString(
    "en-US"
  );

  // Initialize state for remaining time
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    // Update the timer every second
    const timerInterval = setInterval(() => {
      const currentTime = new Date().toLocaleString("en-US");
      const newRemainingTime = new Date(endTimeIST) - new Date(currentTime);

      // Check if the competition has ended
      if (newRemainingTime <= 0) {
        clearInterval(timerInterval);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [endTimeIST]);

  // Convert remaining time to hours, minutes, and seconds
  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  let seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }

  let currentTime = new Date(competitionTimestamp).getTime();
  let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000).toLocaleString(
    "en-US"
  );

  return (
    <div>
      {remainingTime > 0 ? (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            color="error"
            variant="contained"
          >{`${hours} : ${minutes} : ${seconds}`}</Button>
        </div>
      ) : (
        <p>Competition Ended {endTimeIST}</p>
      )}
    </div>
  );
};

export default CompetitionTimer;
