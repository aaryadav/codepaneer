import { useState } from "react";
import "./App.css";

import { Pyodide } from "./pyodide";

function App() {
  const [pyprompt, setPyprompt] = useState('print("hello world!")');
  const [pyoutput, setPyoutput] = useState(null);
  const pyodide = Pyodide.getInstance();

  return (
    <>
      <h1>Code Paneer</h1>
      <div>
        <textarea
          style={{
            padding: "15px",
            width: "100%",
            height: "200px",
            fontFamily: "monospace",
            fontSize: "1rem",
          }}
          value={pyprompt}
          onChange={(e) => {
            setPyprompt(e.target.value);
            console.log(e.target.value);
          }}
        ></textarea>
        <div className="options" >
          <button
            onClick={() => {
              pyodide.setOutput((text) => {
                setPyoutput((prev) => (prev ? prev + '\n' + text : text))
              });
              console.log("clicked", pyprompt);
              pyodide.run(pyprompt);
            }}
          >
            Run
          </button>

          <button
            onClick={() => { setPyoutput(() => ("")) }}
          >
            Clear
          </button>
        </div>
        <p>Ouput:</p>
        <pre style={{
          width: "100%",
          border: "1px solid grey",
          borderRadius: "5px",
          padding: "15px",
          textAlign: "left",
        }}>
          <code>
            {pyoutput}
          </code>
        </pre>

      </div>
    </>
  );
}

export default App;