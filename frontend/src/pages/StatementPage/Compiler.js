import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AceEditor from "react-ace";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";

import LanguageSelect from "../../components/LanguageSelect";
import { toast } from "react-toastify";
import { CODE_SNIPPETS } from "../../data/snippets";
import { Box, TextField, Typography, Paper, useTheme } from "@mui/material";

const blockBg = "#f7f7fa";

const Compiler = ({
  setOutput,
  setLoading,
  code,
  setCode,
  setDesc,
  id,
  c_id,
}) => {
  const [lang, setLang] = useState("cpp");
  const [compiler, setCompiler] = useState(false);
  const [testCase, setTestCase] = useState("");
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: "#1976d2",
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: "#115293",
    },
  }));

  const isLightMode = theme.palette.mode === "light";
  const borderColor = theme.palette.border.secondary;
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


  const handleRun = async () => {
    if(!code.length){
      toast.error("No code detected. Please add some code before submitting.")
      return;
    }
    setLoading(true);
    try {
      const payload = {
        lang,
        code,
        input: testCase,
      };

      const { data } = await axios.post(
        urlConstants.runCode,
        payload,
        getConfig()
      );
      setOutput(data.output);
      setDesc(false);
    } catch (e) {
      setOutput("There was a error while running your code", e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.length) {
      toast.error(
        "No code detected. Please add some code before submitting."
      );
      return;
    }
    setLoading(true);
    try {
      const payload = {
        lang,
        code,
        p_id: id,
        u_id: user._id,
        c_id: c_id,
        input: testCase,
      };

      const { data } = await axios.post(
        urlConstants.submitCode,
        payload,
        getConfig()
      );
      setOutput(data.message);
      setDesc(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  function handleEditorChange(value, event) {
    setCode(value);
  }

  const setLanguage = (val) => {
    setLang(val);
    setCode(CODE_SNIPPETS[val]);
  }

  useEffect(() => {
    if(lang){
      setCode(CODE_SNIPPETS[lang]);
    }
  }, [lang]);

  return (
    <Paper
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: backgroundColor,
        borderRadius: 2,
        boxShadow: "0 2px 12px #0001",
        border: `1px solid ${borderColor}`,
        p: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: `1px solid ${borderColor}`,
          px: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "16px",
            color: "#222",
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
        <ColorButton
          sx={{ ml: 2, fontWeight: 700, borderRadius: 2 }}
          variant="contained"
          onClick={handleRun}
        >
          Run
        </ColorButton>
        <ColorButton
          sx={{
            ml: 2,
            fontWeight: 700,
            borderRadius: 2,
            backgroundColor: "#43a047",
            "&:hover": { backgroundColor: "#357a38" },
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </ColorButton>
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          flex: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            border: `1px solid ${borderColor}`,
            borderRadius: 2,
          }}
        >
          <Editor
            value={code}
            height="100%"
            language={lang}
            onChange={handleEditorChange}
            defaultValue={CODE_SNIPPETS[lang]}
            theme={isLightMode ? "vs-light" : "vs-dark"}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              theme: isLightMode ? "vs-light" : "vs-dark",
              backgroundColor: theme.palette.background.main,
            }}
          />
        </Box>
      </Box>
      {/* Console/Testcase area */}
      <Box
        sx={{
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          borderRadius: 2,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <Stack
          onClick={() => setCompiler((prev) => !prev)}
          sx={{ cursor: "pointer" }}
          direction={0}
          alignItems="center"
          gap={0}
        >
          <Typography fontWeight={600}>Console</Typography>
          <ArrowDropUpIcon />
        </Stack>
        <TextField
          value={testCase}
          onChange={(e) => setTestCase(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          sx={{
            width: 500,
            mt: 2,
            fontSize: 14,
            borderRadius: 1,
          }}
        />
      </Box>
    </Paper>
  );
};

export default Compiler;
