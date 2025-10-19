import { useContext, useEffect, useRef, useState } from 'react';
import '../../assets/style/editor.css';
import '../../assets/style/editor_tool.css';
import Tool from './Tool';
import { PortfolioContext } from '../../context/PortfolioContext';
import { ActiveContext } from '../../context/ActiveElementContext';
import ContextMenu from '../ContextMenu';
import { ContextMenuProps } from '../../context/ContextMenuProps';
import { removeNode } from '../../utils/ElementTree';

import ContentEditModal from './ContentEditModal';
import { useLocation } from 'react-router-dom';
import EditorFrame from './EditorFrame';

const Editor = () => {
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
	

	return (
		<div className="flex mx-1 p-0">
			<div style={{width:"5%",position:"relative"}}>
				<div style={{background:"violet",height:"100%"}}>helo</div>
				<div style={{display:"none",position:"absolute",width:"200px",background:"green",height:"100%",top:0,left:"30px",marginLeft:"10px"}}></div>
			</div>
			<div style={{width:"70%",display:"flex",alignItems:"center",justifyContent:"center"}}>
				<EditorFrame setSection={setSection} />
			</div>
			<div style={{width:"25%"}}>
				<Tool id={id} userid={0} />
			</div>
				<ContextMenu {...menu} options={options} onClose={onClose} />
				<ContentEditModal openEditModal={openEditModal} setOpenModal={setOpenModal} section={section} setSection={setSection} />
		</div>
	);
};

export default Editor;


