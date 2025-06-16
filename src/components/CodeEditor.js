import React, { useState, useEffect, useRef, useContext } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import "./CodeEditor.css";
import Addfile from "../Feature_img/add-file.png";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from '../DataContext';

const CodeEditor = () => {
  const socket = useRef(io("https://college-project-backend-rtiw.onrender.com")).current;

  const [ShareCodeOwner, setShareCodeOwner] = useState();
  const { user, islogin } = useContext(DataContext);
  const [owner, setOwner] = useState(false);
  const [codingLanguage, setcodingLanguage] = useState("javascript");
  const [fileName, setFileName] = useState("");
  const [code, setCode] = useState("// Write your code here...");
  const [output, setOutput] = useState("Your output here... ");
  const [fileList, setFileList] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const { roomId } = useParams();
  const navigate = useNavigate();
  const debounceTimeout = useRef(null);

  useEffect(() => {
    console.log("Joining room:", roomId);
    socket.emit("join-room", { roomId });
    socket.emit("shareCode", { roomId, userId: user?._id, code });

    socket.on("message", (message) => console.log("Received message:", message));
    socket.on("codeRecive", (data) => {
      setCode(data.code);
      setShareCodeOwner(data.by);
    });
    socket.on("codeUpdate", ({ code, codingLanguage }) => {
      if (!owner) {
        setCode(code);
        setcodingLanguage(codingLanguage);
      }
    });

    socket.on("receiveMessage", (data) => {
      console.log("Received chat:", data);
      setChatMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
      socket.off("codeRecive");
      socket.off("codeUpdate");
      socket.off("receiveMessage");
    };
  }, [roomId]);

  useEffect(() => {
    axios.get("https://college-project-backend-rtiw.onrender.com/user/getFile", {
      headers: {
        Authorization: `Bearer ${localStorage?.getItem("token") || null}`
      }
    })
    .then(res => setFileList(res.data.filenames))
    .catch(err => console.error("Error fetching filenames:", err));
  }, []);

  const handleChange = (e) => setcodingLanguage(e.target.value);

  const handleCodeChange = (value) => {
    setCode(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      socket.emit("codeChange", { roomId, code: value, codingLanguage });
    }, 500);
  };

  const sendMessage = () => {
    if (chatInput.trim()) {
      const username = user?.username || "Guest";
      const msgObj = {
        roomId,
        message: chatInput,
        user: username,
        timestamp: new Date().toISOString(),
      };

      socket.emit("sendMessage", msgObj);
      setChatMessages((prev) => [...prev, { ...msgObj, user: "Me" }]);
      setChatInput("");
    }
  };

  const handleEditorDidMount = (editor, monaco) => {};

  const handleshareCode = () => {
    const id = uuidv4();
    const link = `${window.location.origin}/code/${id}`;
    navigator.clipboard.writeText(link).then(() => alert("Link copied: " + link));
    setOwner(true);
    navigate(`/code/${id}`);
  };

  const handleNewfile = async () => {
    const newFileName = prompt("Enter new file name:");
    const newFileLanguage = prompt("Enter file language:");
    if (newFileName && newFileLanguage) {
      try {
        const res = await axios.post("https://college-project-backend-rtiw.onrender.com/user/saveCode", {
          filename: newFileName, code, language: newFileLanguage
        }, {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token") || null}`
          }
        });
        if (res.status === 200) alert("Code saved successfully!");
      } catch (err) {
        console.error("Error saving code:", err);
      }
    }
  };

  const handlesaveCode = async (e) => {
    e.preventDefault();
    let finalFilename = fileName || prompt("Please enter a filename:");
    if (!finalFilename) return alert("Filename is required.");
    setFileName(finalFilename);
    try {
      const res = await axios.post("https://college-project-backend-rtiw.onrender.com/user/saveCode", {
        filename: finalFilename, code, language: codingLanguage
      }, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token") || null}`
        }
      });
      if (res.status === 200) alert("Code saved successfully!");
    } catch (err) {
      console.error("Error saving code:", err);
    }
  };

  const handleRunCode = () => alert("Run button clicked!");

  const handleFileClick = async (fileId) => {
    try {
      const res = await axios.post('https://college-project-backend-rtiw.onrender.com/user/getCode', {
        fileId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const file = res.data.codeFile;
      setCode(file.code);
      setcodingLanguage(file.language);
      setFileName(file.filename);
    } catch (err) {
      console.error("Error fetching file:", err);
    }
  };

  return (
    <div className="outer-container">
      <div className="blank-container">
        <div className="add-file">
          <h2>Project Files</h2>
          <button className="add-file-button" onClick={handleNewfile}>
            <img src={Addfile} alt="Add File" />
          </button>
        </div>
        <div className="blank-header">
          {fileList.map((file) => (
            <div className="file-structure" tabIndex={0} key={file._id}>
              <div
                className="item file"
                onClick={() => handleFileClick(file._id)}
                style={{ cursor: "pointer" }}
              >
                <a>{file.filename}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-header">
          <div className="editor-title">
            <form>
              <select className="dropdown run-button" value={codingLanguage} onChange={handleChange}>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button className="run-button" onClick={handleRunCode}>Run</button>
              <button className="run-button" onClick={handlesaveCode}>Save</button>
              <button className="run-button" onClick={handleshareCode}>Share</button>
            </form>
          </div>
          {ShareCodeOwner && <div>{ShareCodeOwner}</div>}
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
              automaticLayout: true,
              readOnly: false
            }}
            onMount={handleEditorDidMount}
            onChange={handleCodeChange}
          />
        </div>
      </div>

      <div className="output-panel">
        <h2>Output</h2>
        <pre>{output}</pre>
      </div>

      <div className="chat-icon" onClick={() => setChatOpen(!chatOpen)}>💬</div>

      {chatOpen && (
        <div className="chat-box">
          <div className="chat-header">Room Chat</div>
          <div className="chat-messages">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.user === "Me" ? "my-message" : "other-message"}
              >
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
