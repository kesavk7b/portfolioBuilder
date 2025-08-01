import { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../assets/style/editor.css';
import '../../assets/style/editor_tool.css';
import Tool from './Tool';
import PortfolioPreview from './PortfolioPreview';
import { PortfolioContext } from '../../context/PortfolioContext';
import { NavBarDefault } from './navbars';
import { ActiveContext } from '../../context/ActiveElementContext';
import ContextMenu from '../ContextMenu';
import { ContextMenuProps } from '../../context/ContextMenuProps';
import { removeNode } from '../../utils/ElementTree';

import ReactDOMServer from "react-dom/server";
import ContentEditModal from './ContentEditModal';
import { useLocation } from 'react-router-dom';

const Editor = () => {
	const [tab, setTab] = useState('lap');
	const screenSize = tab === 'mob' ? '375px' : tab === 'tab' ? '768px' : '100%';

	const iframeRef = useRef(null);
	const [iframeBody, setIframeBody] = useState(null);

	const {setActiveTree} = useContext(ActiveContext)
	const {portfolio,setPortfolio,render} = useContext(PortfolioContext);

	const [openEditModal,setOpenModal] = useState(false);
	const [section,setSection] = useState("body");
	
	const  {menu,setMenu} = useContext(ActiveContext);

	const {targetNode} = useContext(ContextMenuProps)

	const data = useLocation().state?.portfolio.data || portfolio;
	const id = useLocation().state?.portfolio.id || portfolio.id;
	const options = [
		{ label: `Copy`, onClick: () => alert(JSON.stringify(targetNode)) },
		{ label: `paste`, onClick: () => alert(JSON.stringify(targetNode)) },
        { label: `Edit`, onClick: () => editNode() },
        { label: `Delete`, onClick: () => deleteNode(targetNode) }, 
        { label: `close`, onClick: () =>onClose() ,icon:""}
	]

	const onClose = ()=>{
		setMenu({...menu,visible:false})
		setActiveTree([null])
	}

	const deleteNode = (obj) => {
		const confirmText = "Are you sure you want to delete?";
		if (!window.confirm(confirmText)) return;

		const parts = obj.id.split("-");
		const pageKey = parts[0];

		setPortfolio(prev => {
			const newPages = { ...prev.body.pages };

			if (parts.length === 1) {
			// delete entire page
			delete newPages[obj.id];
			} else {
			// delete node inside page tree
			const pageTree = newPages[pageKey];
			const updatedTree = removeNode(pageTree, obj.id);
			newPages[pageKey] = updatedTree;
			}

			return {
			...prev,
			body: {
				...prev.body,
				pages: newPages
			}
			};
		});
	};


	const editNode = ()=>{
		setOpenModal(true);
	}

	useEffect(() => {
		if (data) {
			setPortfolio(data);
		}	
	},[data, setPortfolio]);
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


const exportToHtml = () => {
  const htmlContent = ReactDOMServer.renderToStaticMarkup(<PortfolioPreview />);
  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Exported Page</title>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "portfolio.html";
  link.click();
};

	return (
		<div className="row no-glutters editor-container m-0 p-0" data-id={render}>
			<div className="editor-section col-lg-9 m-0 p-0">
				<div className="editor-tab-menu d-flex">
					<button className="editor-tab-menu-item" onClick={() => setTab("lap")}>Lap/Desktop</button>
					<button className="editor-tab-menu-item" onClick={() => setTab("tab")}>Tablet</button>
					<button className="editor-tab-menu-item" onClick={() => setTab("mob")}>Mobile</button>
				</div>

				<div className="editor-tab">
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
			</div>

			<div className="editor-tool col-lg-3">
				<Tool id={id} userid={0} />
			</div>
			<ContextMenu {...menu} options={options} onClose={onClose} />
			<ContentEditModal openEditModal={openEditModal} setOpenModal={setOpenModal} section={section} setSection={setSection} />
		</div>
	);
};

export default Editor;


