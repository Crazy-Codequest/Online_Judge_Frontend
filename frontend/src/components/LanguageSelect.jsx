import { MenuItem, Select } from '@mui/material';
import React from 'react'

const LanguageSelect = ({lang, setLang, sx}) => {
  return (
    <Select
      value={lang}
      label="lang"
      onChange={(e) => setLang(e.target.value)}
      sx={{
        ...sx,
        border: "none",
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      MenuProps={{
        disableScrollLock: true,
      }}
    >
      <MenuItem value={"cpp"}>C++</MenuItem>
      <MenuItem value={"python"}>Python</MenuItem>
      <MenuItem value={"javascript"}>JavaScript</MenuItem>
    </Select>
  );
}

export default LanguageSelect