import React, { useState } from "react";
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
} from "@mui/material";
import LanguageSelect from "../../components/LanguageSelect";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("cpp");

  const handleSubmit = async () => {
    try {
      const payload = { lang, code, input };
      const { data } = await axios.post(
        urlConstants.runCode,
        payload,
        getConfig()
      );
      console.log(data);
      setOutput(data.output);
    } catch (e) {
      console.log(e);
    }
  };

  function handleEditorChange(value) {
    setCode(value);
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, overflowX: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50rem" },
            border: "1px solid #d3dce6",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              height: "4rem",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #d3dce6",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                pl: 1,
                fontWeight: 500,
                fontSize: "16px",
                borderRight: "1px solid #d3dce6",
                height: "100%",
                width: "6rem",
                color: "rgba(37,38,94,0.7)",
              }}
            >
              Main.cpp
            </Typography>
            <Box sx={{ ml: 2 }}>
              <LanguageSelect sx={{ height: "100%" }} lang={lang} setLang={setLang} />
            </Box>
            <Button
              sx={{ ml: "auto", mr: 2 }}
              variant="contained"
              onClick={handleSubmit}
            >
              Run
            </Button>
          </Box>
          {/* Editor */}
          <Box
            sx={{
              width: "100%",
              height: { xs: "20rem", md: "30rem" },
              p: 1,
              borderBottom: "1px solid #d3dce6",
            }}
          >
            <Editor
              code={code}
              height="100%"
              language={lang}
              onChange={handleEditorChange}
            />
          </Box>
          {/* Input */}
          <Box sx={{ width: "100%", height: "8rem" }}>
            <TextField
              fullWidth
              placeholder="Add Input"
              multiline
              rows={4}
              variant="outlined"
              sx={{ backgroundColor: "#fff" }}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
        </Box>

        {/* Left Page Editor (Output) */}
        <Box
          sx={{
            width: { xs: "100%", md: "50rem" },
            border: "1px solid #d3dce6",
            boxSizing: "border-box",
          }}
        >
          {/* Nav (Left Editor) */}
          <Box
            sx={{
              height: "4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderBottom: "1px solid #d3dce6",
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                lineHeight: "24px",
                p: "11px 18px",
                borderRight: "1px solid #d3dce6",
                color: "rgba(37,38,94,0.7)",
              }}
            >
              Output
            </Typography>
            <Button
              onClick={() => setOutput("")}
              variant="outlined"
              sx={{
                cursor: "pointer",
                padding: "6px 16px",
                fontSize: "14px",
                lineHeight: "20px",
                color: "rgba(37,38,94,0.7)",
                border: "1px solid #d3dce6",
                borderRadius: "2px",
              }}
            >
              Clear
            </Button>
          </Box>
          {/* Output Textarea */}
          <Box
            component="textarea"
            value={output}
            readOnly
            sx={{
              height: {xs: "10rem", md: "38rem"},
              p: 1,
              width: "100%",
              border: "none",
              overflow: "auto",
              outline: "none",
              resize: "none",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Compiler;
