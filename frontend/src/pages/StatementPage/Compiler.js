import React, { useState } from "react";
import axios from "axios";
import "./Compiler.css";
import { useDispatch } from "react-redux";
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

const Compiler = ({ setOutput }) => {
  const [code, setCode] = useState("");
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function onChange(newValue) {
    setCode(newValue);
    console.log("change", newValue);
  }

  // Render editor
  const Editor = () => {
    return (
      <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
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
        <ColorButton onClick={handleSubmit} variant="contained" size="small">
          Run
        </ColorButton>
        <ColorButton onClick={handleSubmit} variant="contained" size="small">
          Submit
        </ColorButton>
      </Stack>
    );
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        lang: "cpp",
        code,
        input,
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/code/run",
        payload
      );
      console.log(data);
      setOutput(data.output);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="compiler-page">
        <select className="select-bx ">
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
        <div className="compiler-body">
          <Editor />
        </div>
      </div>
      <div className="compiler-bottom">
        <div>
          <h4>Console ^</h4>
        </div>

        <Buttons />
      </div>
    </>
  );
};

export default Compiler;
