import React, { useState } from "react";
import { LuUndo, LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { MdFormatBold } from "react-icons/md";
import { GoItalic } from "react-icons/go";
import { BsTypeUnderline } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

const DragDropCanvas = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [history, setHistory] = useState([{ x: 50, y: 50 }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [text, setText] = useState("Drag Me!"); // Text content
  const [isEditing, setIsEditing] = useState(false);

  const [fontSize, setFontSize] = useState(18);
  const [bold, setBold] = useState(false); // Bold style
  const [italic, setItalic] = useState(false); // Italic style
  const [underline, setUnderline] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");
  
  const [dark, setDark] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const newPosition = position;
      const updatedHistory = history.slice(0, historyIndex + 1);
      setHistory([...updatedHistory, newPosition]);
      setHistoryIndex(updatedHistory.length); 
    }
    setIsDragging(false);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPosition(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPosition(history[newIndex]);
    }
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); 
  };
  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 2); 
  };
  const toggleBold = () => setBold((prev) => !prev);
  const toggleItalic = () => setItalic((prev) => !prev);
  const toggleUnderline = () => setUnderline((prev) => !prev);

  const handleFontChange = (e) => {
    setFontFamily(e.target.value); 
  };

  const handleStartEditing = () => {
    setIsEditing(true); 
  };

  const handleTextChange = (e) => {
    setText(e.target.value); 
  };

  const handleBlur = () => {
    setIsEditing(false); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    
    <div className={
      `${dark ? "dark" : "light"} 
    min-h-screen bg-bb px-24 py-4`}>
      
      <header className="h-16 flex justify-center items-center border-b-2 border-gray-300">
        <button
          onClick={handleUndo}
          disabled={historyIndex === 0}
          className="mr-10"
        >
          <LuUndo2 className="text-2xl bg-textColor text-txtColor" />
          <p className="text-txtColor">undo</p>
        </button>
        <button
          onClick={handleRedo}
          disabled={historyIndex === history.length - 1}
        >
          <LuRedo2 className="text-2xl text-txtColor" />
          <p className="text-txtColor">redo</p>
        </button>
      </header>
      <div
        className="bg-gray-200"
        style={{
          height: "520px",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: bold ? "bold" : "normal",
            textDecoration: underline ? "underline" : "none",
            fontStyle: italic ? "italic" : "normal",
            fontFamily: fontFamily,
            position: "absolute",
            top: position.y,
            left: position.x,
            padding: "10px",
            border: "1px solid #ccc",
            cursor: "grab",
          }}
          className="bg-"
          onMouseDown={handleMouseDown}
        >
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              onBlur={handleBlur}
              autoFocus
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: bold ? "bold" : "normal",
                fontStyle: italic ? "italic" : "normal",
                textDecoration: underline ? "underline" : "none",
                fontFamily: fontFamily,
              }}
            />
          ) : (
            text
          )}
        </div>
      </div>

      <div className="flex justify-center items-center h-16 border-b-2 border-gray-300 space-x-4">
        <select
          className="rounded-2xl"
          value={fontFamily}
          onChange={handleFontChange}
          style={{
            border: "none",
            boxShadow: "1px 2px 1px lightgray",
          }}
        >
          <option value="Arial">Arial</option>
          <option value="Cursive">Cursive</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Monospace">Monospace</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>

        <div
          className="flex bg-white my-auto rounded-xl px-1"
          style={{
            boxShadow: "1px 2px 1px lightgray",
          }}
        >
          <button onClick={decreaseFontSize}>
            <FiMinus />
          </button>
          <p className>{fontSize}</p>
          <button onClick={increaseFontSize}>
            <FiPlus />
          </button>
        </div>
        <button onClick={toggleBold}>
          <MdFormatBold
            className="h-5 w-5"
            style={{
              backgroundColor: bold ? "#DDDEDE" : "inherit",
              border: bold ? "1px solid #BABABA" : "none",
              borderRadius: bold ? "2px" : "none",
            }}
          />
        </button>
        <button onClick={toggleItalic}>
          <GoItalic
            className="h-5 w-5"
            style={{
              backgroundColor: italic ? "#DDDEDE" : "inherit",
              border: italic ? "1px solid #BABABA" : "none",
              borderRadius: italic ? "2px" : "none",
            }}
          />
        </button>
        <button onClick={toggleUnderline}>
          <BsTypeUnderline
            className="h-5 w-5"
            style={{
              backgroundColor: underline ? "#DDDEDE" : "inherit",
              border: underline ? "1px solid #BABABA" : "none",
              borderRadius: underline ? "2px" : "none",
            }}
          />
        </button>
      </div>
      <button
        onClick={handleStartEditing}
        className="flex justify-center items-center mx-auto h-8 rounded-2xl mt-3"
        style={{ backgroundColor: "#E5E5E5" }}
      >
        <TfiText className="mx-2" />
        <p className="mr-2">Add Text</p>
      </button>
    </div>
  );
};

export default DragDropCanvas;
