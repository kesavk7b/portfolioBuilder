import { useContext, useEffect, useRef, useState } from "react";
import ToolHolder from "./ToolHolder";
import { SelectedContext } from "../../context/SelectedContext";
import { useIframeRef } from "../../context/CommonToAll";

const ActiveElement = ({ selected = {},show_tool=0 }) => {
  const iframeRef = useIframeRef();
  const id = selected?.id;

  const [borderStyle, setBorderStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!iframeRef?.current || !id) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument;
    const activeElem = iframeDoc?.getElementById(id);
    const pad = iframeRef?.current?.getClientRects();

    if (!activeElem) return;

    // get bounding box of the element *inside iframe*
    const elemRect = activeElem.getBoundingClientRect();
    // get bounding box of the iframe *in parent page*
    const iframeRect = iframe.getBoundingClientRect();
    
     const style = window.getComputedStyle(iframe);

    const margin = {
      top: parseFloat(style.marginTop),
      right: parseFloat(style.marginRight),
      bottom: parseFloat(style.marginBottom),
      left: parseFloat(style.marginLeft),
    };

    const elem_style = iframeDoc?.defaultView?.getComputedStyle(activeElem);
    const elem_padding = {
      top: parseFloat(elem_style?.paddingTop),
      right: parseFloat(elem_style?.paddingRight),
      bottom: parseFloat(elem_style?.paddingBottom),
      left: parseFloat(elem_style?.paddingLeft),
    };

    const elem_margin = {
        top: parseFloat(elem_style?.marginTop),
        right: parseFloat(elem_style?.marginRight),
        bottom: parseFloat(elem_style?.marginBottom),
        left: parseFloat(elem_style?.marginLeft),
    }

    // Translate iframe-internal coordinates to parent document coordinates
    const top =  elemRect.top+margin.top-elem_padding.top;
    const left = elemRect.left+margin.left-elem_padding.left;
    const width = elemRect.width + elem_margin.left + elem_margin.right;
    const height = elemRect.height +elem_margin.top+elem_margin.bottom;

    // update state
    setBorderStyle({ top, left, width, height });
  }, [selected, iframeRef]);

  return (
    <div
      className="absolute border-4 border-blue-500"
      style={{
        position: "absolute",
        top: borderStyle.top,
        left: borderStyle.left,
        width: borderStyle.width,
        height: borderStyle.height,
        pointerEvents: "none", // so clicks pass through
      }}
    >
      {/* Toolbar */}
      {!show_tool &&
        <div
            className="h-10 w-5/6 absolute -top-11 left-1/2 -translate-x-1/2 bg-white flex shadow rounded-md"
            onClick={(e) => e.stopPropagation()}
        >
            <ToolHolder selected={selected} />
        </div>
      }
    </div>
  );
};

export default ActiveElement;
