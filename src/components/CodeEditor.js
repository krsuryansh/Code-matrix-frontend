import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css"; // Import your custom CSS file
import axios from 'axios';
const CodeEditor = () => {
  // State to store the selected language
  const [codingLanguage, setcodingLanguage] = useState("javascript");

  // Handler to update state on dropdown change
  const handleChange = (event) => {
    setcodingLanguage(event.target.value);
  };

  const [fileName, setFileName] = useState(""); // State to store the file name
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("Your output here... "); 

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // API call to backend
    axios.get("https://college-project-backend-rtiw.onrender.com/user/getFile",  {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token") || null}`
      }
    })
      .then(res => {
        setFileList(res.data.filenames);
      })
      .catch(err => {
        console.error("Error fetching filenames:", err);
      });
  }, []);



  // Handler to save code (optional logic can be added here)
  const handlesaveCode = async (e) => {
    e.preventDefault(); // Prevent form reload

    let finalFilename = fileName;

    // 🔍 Check if filename is not set
    if (!finalFilename || finalFilename.trim() === "") {
      finalFilename = prompt("Please enter a filename:");

      // 🛑 If user cancels or enters empty
      if (!finalFilename || finalFilename.trim() === "") {
        alert("Filename is required to save the code.");
        return;
      }

      setFileName(finalFilename); // Set it so it won't ask again
    }

    try {
      // ✅ Make POST request to backend
      const response = await axios.post("https://college-project-backend-rtiw.onrender.com/user/saveCode", {
        filename: finalFilename,
        code,
        language: codingLanguage,
      }, {
        withCredentials: true, // VERY important if using cookie-based auth
      });

      if (response.status === 200) {
        alert("Code saved successfully!");
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (error) {
      console.error("Error saving code:", error);
      alert("Error saving code. Please check console.");
    }
  };
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


  const handleFileClick = async(fileId) => {
    try {
      // Make a POST request to your backend API endpoint with the fileId
      const response = await axios.post('https://college-project-backend-rtiw.onrender.com/user/getCode', {
        fileId: fileId,  // Send the fileId in the request body
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }); // Include withCredentials if needed
  
      // Handle successful response
      console.log('Code file fetched:', response.data);
      console.log('Code file fetched:', response.data.codeFile.code);
      setCode(response.data.codeFile.code); // Set the code in the editor
      setcodingLanguage(response.data.codeFile.language); // Set the language in the dropdown
      setFileName(response.data.codeFile.filename); // Set the filename in the state
      return response.data; // You can return or use the data in your component as needed
    } catch (error) {
      // Handle error
      console.error('Error fetching code file:', error.response?.data || error.message);
    }
  };
  return (
    <div className="outer-container">
      <div className="blank-container">
        <div className="blank-header">
        <h2>Project Files</h2>

        </div>
       

        {fileList.map((file) => (
          <div className="file-structure">
          
        <div className="item file" key={file._id}
         onClick={() => handleFileClick(file._id)}
         cursor="pointer"
         style={{ cursor: "pointer" }} // Add this line to change the cursor to pointer
        ><a>{file.filename}</a></div>
       
     
       </div>
        ))}
        
      
  
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

            <button className="run-button" onClick={handlesaveCode}>
              Save
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
            onChange={(value) => setCode(value)} 
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
