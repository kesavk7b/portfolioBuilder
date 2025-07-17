import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ActiveContext } from "./context/ActiveElementContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const RootWrapper = () => {
  const [menu, setMenu] = React.useState({ visible: false, x: 0, y: 0 });
  const [elementId, setElementId] = React.useState(null);
  const [activeTree, setActiveTree] = React.useState([null]);
  const [targetNode, setTargetNode] = React.useState(null);

  return (
    <ActiveContext.Provider
      value={{
        menu,
        setMenu,
        elementId,
        setElementId,
        activeTree,
        setActiveTree,
        targetNode,
        setTargetNode
      }}
    >
      <App />
    </ActiveContext.Provider>
  );
};

root.render(<RootWrapper />);
