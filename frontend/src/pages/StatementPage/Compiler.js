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
import LanguageSelect from "../../components/LanguageSelect";
import { toast } from "react-toastify";
import { CODE_SNIPPETS } from "../../data/snippets";
import { Box, TextField, Typography } from "@mui/material";


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
  const [testCase, setTestCase] = useState("1.1.1.1");
  const { user } = useSelector((state) => state.auth);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    "&:hover": {
      backgroundColor: grey[700],
    },
  }));

  const Buttons = () => {
    return (
      <Stack spacing={2} direction="row">
        <ColorButton onClick={handleRun} variant="contained" size="small">
          Run
        </ColorButton>
        <ColorButton onClick={handleSubmit} variant="contained" size="small">
          Submit
        </ColorButton>
      </Stack>
    );
  };

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
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: "#fff",
          height: "80%",
        }}
      >
        <LanguageSelect lang={lang} setLang={setLanguage} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: compiler ? "60%" : "100%",
          }}
        >
          <Editor
            value={code}
            height="100%"
            language={lang}
            onChange={handleEditorChange}
            defaultValue={CODE_SNIPPETS[lang]}
            options={{ automaticLayout: true }}
          />
        </Box>
        {compiler && (
          <Box
            sx={{
              height: "40%",
              backgroundColor: "#fff",
              fontSize: "10px",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                p: "0.2rem 1rem",
                backgroundImage:
                  "radial-gradient(closest-side at 50% 135%, #ffffff 50%, #eceff1 100%)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ cursor: "pointer", display: "flex", gap: 2 }}>
                <Typography>TestCase</Typography>
                <Typography>Code Result</Typography>
              </Box>
              <Box
                onClick={() => setCompiler((prev) => !prev)}
                sx={{ cursor: "pointer" }}
              >
                <ArrowDropUpIcon />
              </Box>
            </Box>
            <TextField
              value={testCase}
              onChange={(e) => setTestCase(e.target.value)}
              variant="outlined"
              multiline
              rows={5}
              sx={{
                m: 1,
                width: "90%"
              }}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: "8%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "0 1rem",
          borderRadius: "5px",
          backgroundColor: "#fff",
          borderRadius: 2
        }}
      >
        <Stack
          onClick={() => setCompiler((prev) => !prev)}
          sx={{ cursor: "pointer" }}
          direction={0}
          alignItems="center"
          gap={0}
        >
          <Typography>Console</Typography>
          <ArrowDropUpIcon />
        </Stack>
        <Buttons />
      </Box>
    </Box>
  );
};

export default Compiler;
