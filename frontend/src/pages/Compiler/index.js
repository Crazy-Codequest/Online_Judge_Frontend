import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
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
import { PlayArrow, RestartAlt, ContentCopy, Code } from "@mui/icons-material";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("cpp");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const borderColor = theme.palette.divider;
  const backgroundColor = theme.palette.background.default;
  const textColor = theme.palette.text.primary;

  editor.defineTheme("customTheme", {
    base: isLightMode ? "vs" : "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background":
        backgroundColor.length === 4
          ? `#${backgroundColor[1]}${backgroundColor[1]}${backgroundColor[2]}${backgroundColor[2]}${backgroundColor[3]}${backgroundColor[3]}`
          : backgroundColor
    },
  });

  useEffect(() => {
    editor.setTheme("customTheme");
  }, [isLightMode, backgroundColor]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { lang, code, input };
      const { data } = await axios.post(
        urlConstants.runCode,
        payload,
        getConfig()
      );
      setOutput(data.output);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(CODE_SNIPPETS[lang]);
    setInput("");
    setOutput("");
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
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
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        p: { xs: 1, md: 4 },
        pt: 0,
        pb: 10,
        bgcolor: theme.palette.background.main,
      }}
    >
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Code sx={{ fontSize: 36, color: "#1976d2", mb: -1, mr: 1 }} />
        <Typography
          variant="h4"
          fontWeight={800}
          color="#2d3a4a"
          display="inline"
        >
          Online Compiler
        </Typography>
        <Typography variant="subtitle1" color="#7b8ba3" mt={1}>
          Write, run, and debug code in your favorite language!
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
          width: "100%",
          height: { xs: "auto", md: "85vh" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: { xs: 500, md: "100%" },
            border: `1px solid ${borderColor}`,
            bgcolor: theme.palette.background.main,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: "4rem",
              display: "flex",
              alignItems: "center",
              borderBottom: `1px solid ${borderColor}`,
              px: 2,
              bgcolor: theme.palette.background.main,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
                color: textColor,
                flexGrow: 1,
                letterSpacing: 0.5,
              }}
            >
              Main.{lang}
            </Typography>
            <Box sx={{ ml: 2 }}>
              <LanguageSelect
                sx={{
                  height: "100%",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                lang={lang}
                setLang={setLanguage}
              />
            </Box>
            <Button
              sx={{ ml: 2, fontWeight: 700, borderRadius: 2 }}
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Running..." : "Run"}
            </Button>
            <Button
              sx={{ ml: 2, fontWeight: 700, borderRadius: 2 }}
              variant="outlined"
              startIcon={<RestartAlt />}
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
          </Box>

          <Box sx={{ flex: 1, p: 1, minHeight: 0 }}>
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
                theme: isLightMode ? "vs-light" : "vs-dark",
                backgroundColor: theme.palette.background.main,
              }}
            />
          </Box>

          <Box
            sx={{
              height: 120,
              p: 2,
              borderTop: `1px solid ${borderColor}`,
              bgcolor: theme.palette.background.main,
            }}
          >
            <Typography sx={{ color: textColor, mb: 1, fontWeight: 600 }}>
              Input
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter input here..."
              multiline
              rows={2}
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              sx={{ bgcolor: theme.palette.background.main, borderRadius: 2 }}
              disabled={loading}
            />
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: 300, md: "100%" },
            border: `1px solid ${borderColor}`,
            bgcolor: theme.palette.background.main,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
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
              bgcolor: theme.palette.background.main,
            }}
          >
            <Typography
              sx={{ fontWeight: 700, color: textColor, letterSpacing: 0.5 }}
            >
              Output
            </Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                onClick={handleCopyOutput}
                sx={{ mr: 1, borderRadius: 2 }}
                disabled={!output}
              >
                Copy Output
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOutput("")}
                sx={{ borderRadius: 2 }}
                disabled={!output}
              >
                Clear
              </Button>
            </Box>
          </Box>

          <Box
            component="textarea"
            value={output}
            readOnly
            sx={{
              flex: 1,
              p: 2,
              width: "100%",
              bgcolor: theme.palette.background.main,
              color: textColor,
              border: "none",
              overflow: "auto",
              outline: "none",
              fontFamily: "monospace",
              fontSize: 16,
              resize: "none",
            }}
          />
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default Compiler;
