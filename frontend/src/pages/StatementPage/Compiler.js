import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { render } from "react-dom";
import AceEditor from "react-ace";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { grey, green } from "@mui/material/colors";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";

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
  const [input, setInput] = useState("");
  const [compiler, setCompiler] = useState(false);
  const [testCase, setTestCase] = useState("1.1.1.1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function onChange(newValue) {
    console.log(newValue);
    setCode(newValue);
  }

  // Render editor
  const Editor = () => {
    return (
      <AceEditor
        mode="java"
        theme="github"
        onChange={(e) => onChange(e)}
        value={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        style={{ width: "100%", height: "100%" }}
      />
    );
  };

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
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
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

  return (
    <div className="compiler-design">
      <div className="compiler-page-editor">
        <select
          onChange={(e) => setLang(e.target.value)}
          className="select-bx "
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
        <div className={`compiler-body${compiler ? "-bottom" : ""}`}>
          <Editor />
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
