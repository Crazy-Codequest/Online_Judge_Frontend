import React, { useState } from "react";
import axios from "axios";
import "./Compiler.css";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    try {
      const payload = {
        lang: "cpp",
        code,
        input,
      };

      const { data } = await axios.post("http://localhost:5000/run", payload);
      console.log(data);
      setOutput(data.output);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="compiler">
      <p className="title">Online Compiler</p>
      <select className="select-bx ">
        <option value="cpp">C++</option>
        <option value="py">Python</option>
      </select>
      <br />
      <textarea
        rows={15}
        cols={70}
        onChange={(e) => setCode(e.target.value)}
        className="text-compiler"
      ></textarea>
      <br />
      <textarea
        rows={5}
        cols={20}
        onChange={(e) => setInput(e.target.value)}
        className="text-compiler"
      ></textarea>
      <br />
      {output && (
        <textarea
          value={output}
          rows={5}
          cols={50}
          className="text-compiler"
        ></textarea>
      )}
      <br />
      <button className="btn" onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  );
};

export default Compiler;
