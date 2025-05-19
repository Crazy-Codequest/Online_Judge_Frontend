import React, { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const InfoRow = ({ label, value, onSave }) => {
  const theme = useTheme();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSave = () => {
    setEditing(false);
    if (onSave) onSave(inputValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", px: 4, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Typography sx={{ flex: 1, color: theme.palette.text.secondary, fontWeight: 500 }}>{label}</Typography>
      {editing ? (
        <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <input
            value={inputValue || ''}
            onChange={e => setInputValue(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: '1rem',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              background: theme.palette.background.paper,
              color: theme.palette.text.primary
            }}
          />
          <Button size="small" color="primary" variant="contained" sx={{ ml: 1 }} onClick={handleSave}>Save</Button>
        </Box>
      ) : (
        <Typography sx={{ flex: 2, color: theme.palette.text.primary }}>{value}</Typography>
      )}
      <Button
        size="small"
        sx={{ ml: 2, color: theme.palette.primary.main, fontWeight: 500, textTransform: "none" }}
        startIcon={<EditIcon fontSize="small" />}
        onClick={() => setEditing(true)}
        disabled={editing}
      >
        Edit
      </Button>
    </Box>
  );
};

export default InfoRow;
