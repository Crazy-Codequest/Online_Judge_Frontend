import React from "react";

const StatementPage = ({ examples, statement, descElements, constraints }) => {
  return (
    <div className="left-page">
      <div className="left-header">
        <h4>Description</h4>
        <h4>Output</h4>

        <h4>Submissions</h4>
      </div>
      <div className="problem--statement">
        <div className="problem-title mb-2">{statement}</div>
        {descElements}

        {examples && (
          <>
            <h3 className="mt-2 mb-2">Examples:</h3>
            <ul>
              {examples.map((example) => (
                <>
                  <div className="mt-2 example">
                    <span className="bold">Input: </span>
                    <span>{` ${example.input}`}</span>
                  </div>
                  <div className="example">
                    <span className="bold">Output: </span>
                    <span>{example.output}</span>
                  </div>
                  <div className="example">
                    <span className="bold">Explanation: </span>
                    <span>{example.explanation}</span>
                  </div>
                </>
              ))}
            </ul>
          </>
        )}
        {constraints && (
          <>
            <h3 className="mt-2 mb-2">Constraints:</h3>
            <ul>
              {constraints.map((constraint) => (
                <li className="mb-1">{constraint}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default StatementPage;
