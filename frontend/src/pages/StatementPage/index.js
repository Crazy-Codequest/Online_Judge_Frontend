import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./problem.css";
import Compiler from "./Compiler";
import StatementPage from "./StatementPage";
// import

const Problem = () => {
  const params = useParams();
  const [problem, setProblem] = useState({});
  const [expand, setExpand] = useState(false);
  const [output, setOutput] = useState("Hefnajkbfjwfqwfhqwvfvwqjhfqhjfvy");

  const getData = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/problems/id`,
        {
          id: params.id,
        }
      );
      setProblem(data.customprob);
    } catch (e) {
      console.log(e);
    }
  };

  const statement = "88. Merge Sorted Array";
  const desc = [
    "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.",
    "Merge nums1 and nums2 into a single array sorted in non-decreasing order.",
    "The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.",
  ];

  const examples = [
    {
      input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
      output: "[1,2,2,3,5,6]",
      explanation: `The arrays we are merging are [1,2,3] and [2,5,6].
        The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.`,
    },
    {
      input: "nums1 = [1], m = 1, nums2 = [], n = 0",
      output: "[1]",
      explanation: `The arrays we are merging are [1] and [].
        The result of the merge is [1].`,
    },
    {
      input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
      output: "[1]",
      explanation: `The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.`,
    },
  ];

  const constraints = [
    "nums1.length == m + n",
    "nums2.length == n",
    "0 <= m, n <= 200",
    "1 <= m + n <= 200",
    "-109 <= nums1[i], nums2[j] <= 109",
  ];

  const descElements = desc.map((line, index) => (
    <p key={index} className="desc-line mb-1">
      {line}
    </p>
  ));

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="problem-page">
      <div className="flex page">
        {output ? (
          <div className="left-page">
            <div className="left-header">
              <h4 onClick={() => setOutput("")}>Description</h4>
              <h4>Output</h4>
              <h4>Submissions</h4>
            </div>
            <div className="problem--statement">
              <div className="problem-title mb-2">My Output:</div>
              <p className="mb-2">{output}</p>
            </div>
          </div>
        ) : (
          <StatementPage
            descElements={descElements}
            examples={examples}
            statement={statement}
            constraints={constraints}
          />
        )}
        <div className="right-page">
          <Compiler output={output} setOutput={setOutput} />
        </div>
        <div className="compiler-submit"></div>
      </div>
    </div>
  );
};

export default Problem;
