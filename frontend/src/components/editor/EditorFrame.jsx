import React, { useContext, useEffect, useRef, useState } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import PortfolioPreview from "./PortfolioPreview";
import ReactDOM from 'react-dom';
import { handleDragOver, handleDrop } from "../../utils/DragAndDrop";
import { useIframeRef } from "../../context/CommonToAll";


const EditorFrame = ({setSection,tab})=>{
        const screenSize = tab === 'mob' ? '375px' : tab === 'tab' ? '768px' : '97%';
    
        const iframeRef = useIframeRef();
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
		<style>
			html,body{
				height:100%;
			}
		</style>
		<body id="root">
		</body>
	</html>
	`;
    return (
        <React.Fragment>
            <iframe
                ref={iframeRef}
                id="editorScreenFrame"
                srcDoc={blankDoc}
                title="portfolio-preview"
				style={{width:screenSize}}
                className="m-4 rounded-md mx-auto m-4"
            />
            {iframeBody &&
            ReactDOM.createPortal(
                    <PortfolioPreview setSection={setSection} />
                ,
                iframeBody
            )}
        </React.Fragment>
    )
}

export default EditorFrame;