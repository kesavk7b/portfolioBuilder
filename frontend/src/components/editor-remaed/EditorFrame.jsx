import { useContext, useEffect, useRef, useState } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import PortfolioPreview from "./PortfolioPreview";
import ReactDOM from 'react-dom';


const EditorFrame = ({setSection})=>{

    const [tab, setTab] = useState('lap');
        const screenSize = tab === 'mob' ? '375px' : tab === 'tab' ? '768px' : '100%';
    
        const iframeRef = useRef(null);
        const [iframeBody, setIframeBody] = useState(null);
    
        const {render} = useContext(PortfolioContext);
        

    useEffect(() => {

		const iframe = iframeRef.current;

		const handleLoad = () => {
			const iframeDoc = iframe.contentDocument;
			
			// ✅ Inject Bootstrap CSS
			const link = iframeDoc.createElement("link");
			link.rel = "stylesheet";
			link.href = "/assets/bootstrap-5.0.2/css/bootstrap.min.css";
			iframeDoc.head.appendChild(link);

			// ✅ Inject Bootstrap CSS
			const css_link = iframeDoc.createElement("link");
			css_link.rel = "stylesheet";
			css_link.href = "/assets/css/portfolio.css";
			iframeDoc.head.appendChild(css_link);

			// ✅ Inject Bootstrap JS
			const script = iframeDoc.createElement("script");
			script.src = "/assets/bootstrap-5.0.2/js/bootstrap.bundle.min.js";
			script.defer = true;
			iframeDoc.head.appendChild(script);

			// ✅ Inject Bootstrap JS
			const portfolio_script = iframeDoc.createElement("script");
			portfolio_script.src = "/assets/js/portfolio.js";
			portfolio_script.defer = true;
			iframeDoc.head.appendChild(portfolio_script);

			// ✅ Set body for portal rendering
			const body = iframeDoc.getElementById("root");
			setIframeBody(body);
		};

		iframe.addEventListener("load", handleLoad);
		return () => iframe.removeEventListener("load", handleLoad);

	});

	const blankDoc = `
	<!DOCTYPE html>
	<html lang="en">
		<head><base target="_parent"></head>
		<body>
		<div id="root"></div>
		</body>
	</html>
	`;
    return (
        <div className="row m-1 editor-container p-2" data-id={render}>
            <div className="editor-section col-lg-12 m-0 p-0">
                {/* <div className="editor-tab-menu d-flex">
                    <button className="editor-tab-menu-item" onClick={() => setTab("lap")}>Lap/Desktop</button>
                    <button className="editor-tab-menu-item" onClick={}>Tablet</button>
                    <button className="editor-tab-menu-item" onClick={() => setTab("mob")}>Mobile</button>

                </div> */}
                <div className="editor-tabs editor-tab-menu d-flex">
                    <input type="radio" id="desktop-tab" name="viewport" defaultChecked  />
                    <label for="desktop-tab" className="editor-tab-menu-item">Desktop</label>

                    <input type="radio" id="tablet-tab" name="viewport" />
                    <label for="tablet-tab" className="editor-tab-menu-item">Tablet</label>

                    <input type="radio" id="mobile-tab" name="viewport" />
                    <label for="mobile-tab" className="editor-tab-menu-item">Mobile</label>
                </div>
                
                <div>
                    <input type="text" style={{width:"100%"}} value={"http://localhost/firstpage/"} />
                </div>
                <div className="editor-tabs">
                    <iframe
                        ref={iframeRef}
                        id="editorScreenFrame"
                        srcDoc={blankDoc}
                        title="portfolio-preview"
                        className="screen-view"
                        style={{
                            width: screenSize,
                            height: "83vh",
                            border: "1px solid #ccc",
                        }}
                    />
                    {iframeBody &&
                    ReactDOM.createPortal(
                            <PortfolioPreview setSection={setSection} />
                        ,
                        iframeBody
                    )}
                </div>
                <div>edit mode</div>
            </div>

        </div>
    )
}

export default EditorFrame;