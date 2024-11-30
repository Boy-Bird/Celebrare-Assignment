const Header = () => {
  return (
    <div className="flex justify-center items-center h-14">
      <button onClick={handleUndo} disabled={historyIndex===0} className="mr-5 bg-">undo</button>
      <button onClick={handleRedo} disabled={historyIndex===history.length-1}>redo</button>
    </div>
  );
};
export default Header;
