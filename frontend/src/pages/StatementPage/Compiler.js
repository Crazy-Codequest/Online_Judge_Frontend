import React, { useState } from "react";
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

  function onChange(newValue) {
    console.log(newValue);
    setCode(newValue);
  }


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


  return (
    <div className="compiler-design">
      <div className="compiler-page-editor">
        <LanguageSelect lang={lang} setLang={setLang} />
        <div className={`compiler-body${compiler ? "-bottom" : ""}`}>
          <Editor
            code={code}
            height="100%"
            language={lang}
            onChange={handleEditorChange}
            options={{ automaticLayout: true }}
          />
        </div>
        {compiler && (
          <div className="compiler-bottom">
            <main className="header">
              <div className="compiler-bottom-header-left">
                <p>TestCase</p>
                <p>Code Result</p>
              </div>
              <div
                onClick={() => setCompiler((prev) => !prev)}
                className="compiler-bottom-header-right"
              >
                <ArrowDropUpIcon />
              </div>
            </main>
            <textarea
              value={testCase}
              onChange={(e) => setTestCase(e.target.value)}
              className="testcase"
            />
          </div>
        )}
      </div>
      <div className="compiler-footer">
        <div onClick={() => setCompiler((prev) => !prev)}>
          <h4 className="console">
            Console
            <ArrowDropUpIcon />
          </h4>
        </div>

        <Buttons />
      </div>
    </div>
  );
};

export default Compiler;
