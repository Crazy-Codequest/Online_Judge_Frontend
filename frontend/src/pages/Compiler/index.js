import React, { useState } from "react";
import axios from "axios";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";
import { Editor } from "@monaco-editor/react";
import { Button, TextField } from "@mui/material";
import LanguageSelect from "../../components/LanguageSelect";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("cpp");

  const handleSubmit = async () => {
    try {
      const payload = {
        lang,
        code,
        input,
      };

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

  function handleEditorChange(value, event) {
    setCode(value);
  }

  return (
    <div className="online-compiler-page">
      <div className="right-page-editor">
        <div className="nav-right">
          <p className="nav-title-compiler">Main.cpp</p>
          <LanguageSelect
            sx={{ height: "100%" }}
            lang={lang}
            setLang={setLang}
          />
          <Button
            sx={{ ml: "auto", mr: 2 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Run
          </Button>
        </div>
        <Editor
          code={code}
          height="50vh"
          language={lang}
          onChange={handleEditorChange}
        />
        <TextField
          placeholder="Add Input"
          rows={7}
          multiline={true}
          sx={{
            backgroundColor: "#fff",
            width: "100%",
          }}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="left-page-editor">
        <div className="nav-left">
          <div className="shell-name">Output</div>
          <button
            onClick={() => setOutput("")}
            className="desktop-clear-button"
          >
            Clear
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          className="output-tabbox"
        />
      </div>
    </div>
  );
};

export default Compiler;
