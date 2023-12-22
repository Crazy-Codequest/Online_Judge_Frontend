import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function CustomDatepicker({
  start_date,
  end_date,
  handleChange,
}) {
  return (
    <div className="mt-1">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex-between">
          <DatePicker
            key={1}
            onChange={(e) => handleChange("start_date", e["$d"])}
            value={start_date}
            label="Start Date"
            className="datepicker"
          />
          <p>–</p>{" "}
          <DatePicker
            key={2}
            onChange={(e) => handleChange("end_date", e["$d"])}
            value={end_date}
            label="End Date"
            className="datepicker"
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}
