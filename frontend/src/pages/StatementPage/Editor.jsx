import React from "react";
import Editor from "@monaco-editor/react";

export function MultiLanguageEditor() {
  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      defaultValue="// some comment"
      onChange={handleEditorChange}
    />
  );
}

