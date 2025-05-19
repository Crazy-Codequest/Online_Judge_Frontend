import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const SOCIAL_KEYS = ["github", "linkedin", "twitter", "website", "instagram", "facebook"];

const SocialsTable = ({ socialLinks = {}, handleFieldSave }) => (
  <Box>
    <Typography variant="h6" sx={{ fontWeight: 700, px: 4, pt: 4, pb: 2 }}>
      Social Links
    </Typography>
    <Divider />
    {SOCIAL_KEYS.map((key) => (
      <Box key={key} sx={{ display: 'flex', alignItems: 'center', px: 4, py: 2, borderBottom: '1px solid #333' }}>
        <Typography sx={{ flex: 1, color: 'text.secondary', fontWeight: 500 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
        <Typography sx={{ flex: 2, color: 'text.primary' }}>{socialLinks[key] || '-'}</Typography>
        {handleFieldSave && (
          <button onClick={() => handleFieldSave(key, prompt(`Update ${key}:`, socialLinks[key] || ''))} style={{ marginLeft: 8 }}>
            Edit
          </button>
        )}
      </Box>
    ))}
  </Box>
);

export default SocialsTable;
