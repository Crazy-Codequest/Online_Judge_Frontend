import * as React from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Stack, Typography } from "@mui/material";

function ProblemDay(props) {
  const { day, problemsMapping, outsideCurrentMonth, ...other } = props;
  const formattedDate = dayjs(day).format("YYYY-MM-DD");
  const { statement, id } = problemsMapping[formattedDate] || {};

  return (
    <Tooltip title={id ? statement : ""} arrow>
      <Box sx={{ position: "relative", cursor: id ? "pointer" : "default" }}>
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
        />
        {!outsideCurrentMonth && id && (
          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              left: "50%",
              transform: "translateX(-50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: "primary.main",
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}


export default function ProblemCalendar({ problems }) {
  const navigate = useNavigate();
  const initialValue = dayjs();

  const problemsMapping = React.useMemo(() => {
    const mapping = {};
    const now = dayjs();
    const fiftyDaysAgo = now.subtract(50, "day");

    problems.forEach((problem) => {
      const problemDate = dayjs(problem.dailyDate);
      if (
        problemDate.isAfter(fiftyDaysAgo) &&
        problemDate.isBefore(now.add(1, "day"))
      ) {
        mapping[problemDate.format("YYYY-MM-DD")] = {
          statement: problem.statement,
          id: problem._id,
        };
      }
    });
    return mapping;
  }, [problems]);

  const handleDateClick = (date) => {
    if (!date) return;
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const problemData = problemsMapping[formattedDate];
    if (problemData) {
      navigate(`/statement/${problemData.id}`);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        onChange={handleDateClick}
        shouldDisableDate={(date) => date.isAfter(dayjs())}
        slots={{
          day: (dayProps) => (
            <ProblemDay {...dayProps} problemsMapping={problemsMapping} />
          ),
        }}
      />
    </LocalizationProvider>
  );
}

