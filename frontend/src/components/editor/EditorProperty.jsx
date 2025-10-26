import React, { useContext, useEffect } from "react";
import DropDown from "../DropDown";
import SpaceInput from "../input/SpaceInput";
import { SelectedContext } from "../../context/SelectedContext";
import { update_props } from "../../utils/Common";
import CloseIcon from '@mui/icons-material/Close';
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import { Typography } from '@mui/material';
import { CommonToAllContext } from "../../context/CommonToAll";
import EditorPropertyType from "./EditorPropertyType";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const EditorProperty = ({pageData,setPageData,activePage=undefined,data_from=""})=>{
    const {data,selected,setData,setOpenBoxModal} = useContext(SelectedContext)
    const {propertyToolActive,setPropertyToolActive} = useContext(CommonToAllContext);
    pageData = data_from===""? data :pageData;
    setPageData = data_from===""? setData :setPageData;
    const styles = selected?.style ?? {};
    const elem_id = selected[0]?.id ?? "";
    const openBoxmodel = ()=>{
        setOpenBoxModal(true)
    }

    useEffect(()=>{
        console.log("check the updte",data)
    },[data])
     return (
        <div>
            <div className="h-[90vh] overflow-y-scroll scrollbar-hide">
                <h1 className="px-2 font-bold flex items-center justify-between h-12 border border-[var(--color-border)] text-[var(--color-text-primary)]">
                    Properties 
                    {
                        propertyToolActive &&  (<span onClick={()=>setPropertyToolActive(false)}><CloseOutlinedIcon /></span>)
                    }
                </h1>
                {
                    propertyToolActive && <EditorPropertyType />
                }
                {
                    !propertyToolActive &&
                    <div className="p-4 text-[var(--color-text-secondary)]">
                        <DropDown title="Layout" openState={true}>
                            <div className="flex flex-col">
                                <label className="mb-1">Display</label>
                                <select
                                    value={styles?.dispaly}
                                    className="bg-[var(--color-bg)] p-2"
                                    onChange={(e) => update_props(pageData, setPageData, elem_id, { display: e.target.value },activePage)}
                                >
                                    <option value="">Select</option>
                                    <option value="flex">Flex</option>
                                    <option value="grid">Grid</option>
                                    <option value="block">Block</option>
                                    <option value="inline">Inline</option>
                                    <option value="inlineBlock">Inline-Block</option>
                                    <option value="inlineFlex">Inline-Flex</option>
                                    <option value="none">None</option>
                                </select>
                                <label className="mb-1">Position</label>
                                <select onChange={(e) => update_props(pageData, setPageData, elem_id, { position: e.target.value },activePage)} className="bg-[var(--color-bg)] p-2 mb-2">
                                    <option value="">Select</option>
                                    <option value="static">Static</option>
                                    <option value="Relative">Relative</option>
                                    <option value="absolute">Absolute</option>
                                    <option value="fixed">Fixed</option>
                                    <option value="sticky">Sticky</option>
                                </select>
                                <div className="grid grid-cols-2">
                                    <input className="rounded-lg border border-[var(--color-border)] m-1 p-3 bg-[var(--color-bg)]" placeholder="Top" value={styles?.top || 0}
                                        onChange={(e) => update_props(pageData, setPageData, elem_id, { top: e.target.value },activePage)}
                                    />
                                    <input className="rounded-lg border border-[var(--color-border)] m-1 p-3 bg-[var(--color-bg)]" placeholder="Bottom" value={styles?.bottom || 0}
                                        onChange={(e) => update_props(pageData, setPageData, elem_id, { top: e.target.value },activePage)}
                                    />
                                    <input className="rounded-lg border border-[var(--color-border)] m-1 p-3 bg-[var(--color-bg)]" placeholder="Left" value={styles?.left || 0}
                                        onChange={(e) => update_props(pageData, setPageData, elem_id, { top: e.target.value },activePage)}
                                    />
                                    <input className="rounded-lg border border-[var(--color-border)] m-1 p-3 bg-[var(--color-bg)]" placeholder="Right" value={styles?.right || 0}
                                        onChange={(e) => update_props(pageData, setPageData, elem_id, { top: e.target.value },activePage)}
                                    />
                                    <SpaceInput title="Heigth" onChange={(val) => update_props(pageData, setPageData, elem_id, { height: val },activePage)} />
                                    <SpaceInput title="Width" onChange={(val) => update_props(pageData, setPageData, elem_id, { width: val },activePage)} />
                                </div>
                                <label className="mb-1">Over flow</label>
                                <select className="bg-[var(--color-bg)] p-2">
                                    <option value="">Select</option>
                                    <option value="visible">Visible</option>
                                    <option value="hidden">Hidden</option>
                                    <option value="scroll">Scroll</option>
                                    <option value="clip">Clip</option>
                                </select>
                                <label className="mb-1">Z-index</label>
                                <input type="number" onChange={(e) => update_props(pageData, setPageData, elem_id, { zIndex: e.target.value },activePage)} className="bg-[var(--color-bg)] p-2" value={0} />
                            </div>
                        </DropDown>
                        <DropDown title="Spacing">
                            <div className="grid grid-cols-1">
                                {/* <SpaceInput title="Padding" /> */}
                                <div className="flex">
                                    <div className="w-[70vw]">
                                        <SpaceInput title="Padding" onChange={(val) => update_props(pageData, setPageData, elem_id, { padding: val },activePage)} placeholder="All" />
                                    </div>
                                    <button className="p-1" onBlur={()=>setOpenBoxModal(true)}>
                                        <Typography onClick={openBoxmodel}>
                                            <LinkRoundedIcon />
                                        </Typography>
                                    </button>
                                </div>
                                <SpaceInput title="Margin" onChange={(val) => update_props(pageData, setPageData, elem_id, { margin: val },activePage)} />
                            </div>
                        </DropDown>
                        <DropDown title="Typography"></DropDown>
                        <DropDown title="Background">
                            <input type="color" onChange={(e) => update_props(pageData, setPageData, elem_id, { backgroundColor: e.target.value },activePage)}/>
                        </DropDown>
                        <DropDown title="Borders"></DropDown>

                    </div>
                }
            </div>
            <div className="flex items-center justify-center h-[10vh] border border-[var(--color-border)]">
                <button className="flex items-center justify-center w-1/2 rounded-lg bg-blue-700 p-2 text-[var(--color-text-primary)]">
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditorProperty;