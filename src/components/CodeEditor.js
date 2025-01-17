import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css"; // Import your custom CSS file

const CodeEditor = () => {
  // State to store the selected language
  const [codingLanguage, setcodingLanguage] = useState("javascript");

  // Handler to update state on dropdown change
  const handleChange = (event) => {
    setcodingLanguage(event.target.value);
  };

  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("Your output here... "); 
  // Dynamically load suggestions based on the selected language
  const handleEditorDidMount = (editor, monaco) => {
    // Register completion items based on the selected language
    const registerCompletionItems = () => {
      // Register completion provider for JavaScript
      if (codingLanguage === "javascript") {
        monaco.languages.registerCompletionItemProvider("javascript", {
          provideCompletionItems: () => {
            const suggestions = [
              {
                label: "console.log",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "console.log(${1});",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Log output to the console",
              },
              {
                label: "useState",
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText:
                  "const [${1:state}, ${2:setState}] = useState(${3:initialValue});",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "React useState Hook",
              },
            ];
            return { suggestions };
          },
        });
      }

      // Register completion provider for C
      if (codingLanguage === "c") {
        monaco.languages.registerCompletionItemProvider("c", {
          provideCompletionItems: () => {
            const suggestions = [
              {
                label: "#include <stdio.h>",
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: "#include <stdio.h>",
                documentation: "Standard input-output library in C",
              },
              {
                label: "printf",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "printf(${1:\"Hello, World!\"});",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Print output in C",
              },
            ];
            return { suggestions };
          },
        });
      }

      // Register completion provider for C++
      if (codingLanguage === "cpp") {
        monaco.languages.registerCompletionItemProvider("cpp", {
          provideCompletionItems: () => {
            const suggestions = [
              {
                label: "#include <iostream>",
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: "#include <iostream>",
                documentation: "Standard I/O library in C++",
              },
              {
                label: "cout",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "cout << ${1:\"Hello, World!\"} << endl;",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Print output in C++",
              },
            ];
            return { suggestions };
          },
        });
      }

      // Register completion provider for Java
      if (codingLanguage === "java") {
        monaco.languages.registerCompletionItemProvider("java", {
          provideCompletionItems: () => {
            const suggestions = [
              {
                label: "System.out.println",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "System.out.println(${1:\"Hello, World!\"});",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Print output in Java",
              },
              {
                label: "Scanner",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "Scanner scanner = new Scanner(System.in);",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: "Create a Scanner object for input",
              },
            ];
            return { suggestions };
          },
        });
      }
    };

    // Register completion items for the selected language
    registerCompletionItems();
  };

  // Handle the Run button click (optional logic can be added here)
  const handleRunCode = () => {
    alert("Run button clicked! You can add your logic here to run the code.");
  };

  return (
    <div className="outer-container">
      <div className="blank-container">
        <h2>Blank Section</h2>
        <p>chattt</p>
      </div>

      {/*Editor Container*/}

      <div className="editor-container">
        <div className="editor-header">
          <form>
            <select
              className="dropdown"
              id="dropdown"
              value={codingLanguage}
              onChange={handleChange}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>

            {/* Run Button */}
            <button className="run-button" onClick={handleRunCode}>
              Run
            </button>
          </form>
        </div>

        <div className="editor-box">
          <Editor
            height="100%"
            defaultLanguage={codingLanguage}
            value={code}
            theme="vs-dark"
            options={{
              fontSize: 20,
              lineHeight: 24,
              minimap: { enabled: false },
              suggestOnTriggerCharacters: true,
              parameterHints: true,
            }}
            onMount={handleEditorDidMount} // Attach the onMount callback
          />
        </div>
      </div>

      <div className="output-panel">
        <h2>Output</h2>
        <pre>{output}</pre> {/* Display the output here */}
      </div>
      </div>
    );
};

export default CodeEditor;
