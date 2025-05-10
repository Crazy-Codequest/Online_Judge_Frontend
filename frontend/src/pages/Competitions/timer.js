import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { Typography, IconButton, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CompetitionTimer = ({ competitionTimestamp }) => {
  const duration = 3 * 60 * 60 * 1000;
  let currentTimeStamp = new Date(competitionTimestamp).getTime();
  let endTimeIST = new Date(currentTimeStamp + duration).toLocaleString(
    "en-US"
  );

  const [remainingTime, setRemainingTime] = useState(duration);
  const [showTimer, setShowTimer] = useState(true);
  const notifiedRef = useRef({});

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date().toLocaleString("en-US");
      const newRemainingTime = new Date(endTimeIST) - new Date(currentTime);

      if (newRemainingTime <= 0) {
        clearInterval(timerInterval);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [endTimeIST]);

  useEffect(() => {
    const thresholds = [30, 10, 5, 1];
    thresholds.forEach((min) => {
      if (
        Math.floor(remainingTime / 60000) === min &&
        !notifiedRef.current[min]
      ) {
        toast.warn(`Only ${min} minute${min > 1 ? 's' : ''} remaining!`, { autoClose: 5000 });
        notifiedRef.current[min] = true;
      }
    });
  }, [remainingTime]);

  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  let seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }
  const percentLeft = remainingTime / duration;
  let timerColor = "success";
  if (percentLeft <= 0.5 && percentLeft > 0.25) timerColor = "warning";
  if (percentLeft <= 0.25) timerColor = "error";
  const wobble = percentLeft <= 0.1 && remainingTime > 0;

  let currentTime = new Date(competitionTimestamp).getTime();
  let updatedTIme = new Date(currentTime + 2 * 60 * 60 * 1000).toLocaleString(
    "en-US"
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
      <IconButton onClick={() => setShowTimer((v) => !v)} size="small" sx={{ mr: 1 }}>
        {showTimer ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
      {showTimer && (
        <Button
          color={timerColor}
          variant="contained"
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            minWidth: 120,
            boxShadow: 2,
            animation: wobble ? 'wobble 0.7s infinite' : 'none',
            '@keyframes wobble': {
              '0%': { transform: 'scale(1) rotate(0deg)' },
              '20%': { transform: 'scale(1.08) rotate(-2deg)' },
              '40%': { transform: 'scale(0.96) rotate(2deg)' },
              '60%': { transform: 'scale(1.04) rotate(-1deg)' },
              '80%': { transform: 'scale(0.98) rotate(1deg)' },
              '100%': { transform: 'scale(1) rotate(0deg)' },
            },
            transition: 'background 0.3s',
          }}
        >
          {`${hours} : ${minutes} : ${seconds}`}
        </Button>
      )}
      {!showTimer && (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Timer hidden
        </Typography>
      )}
      {remainingTime === 0 && (
        <Typography>Competition Ended {endTimeIST}</Typography>
      )}
    </Box>
  );
};

export default CompetitionTimer;
