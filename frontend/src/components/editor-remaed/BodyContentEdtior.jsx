import { useContext } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import { ContextMenuProps } from "../../context/ContextMenuProps";

const BodyContentEditor = () => {
    const {portfolio, setPortfolio} = useContext(PortfolioContext);
    const {targetNode} = useContext(ContextMenuProps);
    return (
        <div className="body-content-editor">
            <h2>Body Content Editor</h2>
            {targetNode && (JSON.stringify(targetNode, null, 2))}
        </div>
    )
}

export default BodyContentEditor;