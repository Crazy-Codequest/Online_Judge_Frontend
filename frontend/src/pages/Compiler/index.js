import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import { Editor } from "@monaco-editor/react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  useTheme,
} from "@mui/material";
import LanguageSelect from "../../components/LanguageSelect";
import { CODE_SNIPPETS } from "../../data/snippets";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("cpp");

  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const borderColor = theme.palette.divider;
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  const handleSubmit = async () => {
    try {
      const payload = { lang, code, input };
      const { data } = await axios.post(
        urlConstants.runCode,
        payload,
        getConfig()
      );
      setOutput(data.output);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(lang){
      setCode(CODE_SNIPPETS[lang]);
    }
  }, [lang]);

  const setLanguage = (value) => {
    setLang(value);
    setCode(CODE_SNIPPETS[value]);
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        overflowX: "hidden",
        minHeight: "100vh",
        backgroundImage: `radial-gradient(
            closest-side at 50% 135%,
          #ffffff 50%,
          #eceff1 100%
        )`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
          width: "100%",
          height: "85vh",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: "100%",
            border: `1px solid ${borderColor}`,
            bgcolor: backgroundColor,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "4rem",
              display: "flex",
              alignItems: "center",
              borderBottom: `1px solid ${borderColor}`,
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                color: textColor,
                flexGrow: 1,
              }}
            >
              Main.cpp
            </Typography>
            <Box sx={{ ml: 2 }}>
              <LanguageSelect
                sx={{
                  height: "100%",
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  backgroundColor: "transparent",
                }}
                lang={lang}
                setLang={setLanguage}
              />
            </Box>
            <Button sx={{ mr: 2 }} variant="contained" onClick={handleSubmit}>
              Run
            </Button>
          </Box>

          <Box sx={{ height: "70%", p: 1 }}>
            <Editor
              value={code}
              height="100%"
              language={lang}
              defaultValue={CODE_SNIPPETS[lang]}
              onChange={setCode}
              theme={isLightMode ? "vs-light" : "vs-dark"}
              options={{
                minimap: { enabled: false },
                fontSize: 16,
              }}
            />
          </Box>

          <Box
            sx={{ height: "20%", p: 2, borderTop: `1px solid ${borderColor}` }}
          >
            <Typography sx={{ color: textColor, mb: 1 }}>Input:</Typography>
            <TextField
              fullWidth
              placeholder="Enter input here..."
              multiline
              rows={3}
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "40%" }, // Increased width for better proportion
            height: "100%",
            border: `1px solid ${borderColor}`,
            bgcolor: backgroundColor,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: "4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${borderColor}`,
              px: 2,
            }}
          >
            <Typography sx={{ fontWeight: 500, color: textColor }}>
              Output
            </Typography>
            <Button variant="outlined" onClick={() => setOutput("")}>
              Clear
            </Button>
          </Box>

          <Box
            component="textarea"
            value={output}
            readOnly
            sx={{
              height: "calc(100% - 4rem)",
              p: 2,
              width: "100%",
              bgcolor: "transparent",
              color: textColor,
              border: "none",
              overflow: "auto",
              outline: "none",
              resize: "none",
              fontSize: "16px",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Compiler;
