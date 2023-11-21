import React from "react";

const StatementPage = ({
  examples,
  setDesc,
  statement,
  description,
  constraints,
}) => {
  const descElements = () => {
    return description.map((line, index) => (
      <p key={index} className="desc-line mb-1">
        {line}
      </p>
    ));
  };

  return (
    <div className="left-page">
      <div className="left-header">
        <h4 onClick={() => setDesc(true)}>Description</h4>
        <h4 onClick={() => setDesc(false)}>Submissions</h4>
      </div>
      <div className="problem--statement">
        <div className="problem-title mb-2">{statement}</div>
        {descElements()}

        {examples && (
          <>
            <h3 className="mt-2 mb-2">Examples:</h3>
            <ul>
              {examples.map((example) => (
                <main key={example.input}>
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
                </main>
              ))}
            </ul>
          </>
        )}
        {constraints && (
          <>
            <h3 className="mt-2 mb-2">Constraints:</h3>
            <ul>
              {constraints.map((constraint, index) => (
                <li key={index} className="mb-1">
                  {constraint}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default StatementPage;
