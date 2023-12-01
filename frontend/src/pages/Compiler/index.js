import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { urlConstants } from "../../apis";
import { getConfig } from "../../utils/getConfig";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const payload = {
        lang: "cpp",
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

  {
    /* <select className="select-bx ">
        <option value="cpp">C++</option>
        <option value="py">Python</option>
      </select> */
  }

  return (
    <div className="online-compiler-page">
      <div className="right-page-editor">
        <div className="nav-right">
          <p className="nav-title-compiler">Main.cpp</p>
          <button onClick={handleSubmit} className="desktop-run-button run">
            Run
          </button>
        </div>
        <textarea
          onChange={(e) => setCode(e.target.value)}
          className="code-editor"
        ></textarea>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          className="input-box"
        ></textarea>
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
        <textarea value={output} className="output-tabbox"></textarea>
      </div>
    </div>
  );
};

export default Compiler;
