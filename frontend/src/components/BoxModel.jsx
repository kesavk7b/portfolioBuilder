import React, { useContext, useRef, useEffect } from "react";
import { SelectedContext } from "../context/SelectedContext";

const BoxModel = ({ editorRef, zoom }) => {
  const { selected, openBoxModal } = useContext(SelectedContext);

  const marginRef = useRef({});
  const paddingRef = useRef({});

  useEffect(() => {
    if (!openBoxModal) return;

    const container = editorRef.current;
    if (!container) return;

    selected.forEach((sel) => {
      const id = sel.id;
      const element = container.querySelector(`#${id}`);
      if (!element) return;

      const computed = window.getComputedStyle(element);
      const getNum = (val) => parseFloat(val) || 0;

      // Store computed values in refs
      paddingRef.current[id] = {
        top: getNum(computed.paddingTop),
        right: getNum(computed.paddingRight),
        bottom: getNum(computed.paddingBottom),
        left: getNum(computed.paddingLeft),
      };

      marginRef.current[id] = {
        top: getNum(computed.marginTop),
        right: getNum(computed.marginRight),
        bottom: getNum(computed.marginBottom),
        left: getNum(computed.marginLeft),
      };
    });
  }, [openBoxModal, selected, editorRef]);

  return (
    <>
      {openBoxModal &&
        selected.map((sel, i) => {
          const id = sel.id;
          const container = editorRef.current;
          const element = container?.querySelector(`#${id}`);
          if (!element) return null;

          const rect = element.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const pad = paddingRef.current[id] || {};
          const mar = marginRef.current[id] || {};

          const scrollTop = container.scrollTop || 0;
          const top = ((rect.top - containerRect.top) / zoom) + scrollTop;
          const left = ((rect.left - containerRect.left) / zoom);

          const height = rect.height - ((pad.top || 0) + (pad.bottom || 0));
          const width = rect.width - ((pad.left || 0) + (pad.right || 0));
          const marHeight = rect.height + ((mar.top || 0) + (mar.bottom || 0));
          const marWidth = rect.width + ((mar.left || 0) + (mar.right || 0));

          return (
            <React.Fragment key={i}>
              {/* Padding box */}
              <div
                className="absolute border-4 border-blue-500 pointer-events-none"
                style={{
                  top: top + (pad.top || 0),
                  left: left + (pad.left || 0),
                  height,
                  width,
                }}
              />

              {/* Margin box */}
              <div
                className="absolute border-4 border-gray-500 pointer-events-none"
                style={{
                  top: top - (mar.top || 0),
                  left: left - (mar.left || 0),
                  height: marHeight,
                  width: marWidth,
                }}
              />
            </React.Fragment>
          );
        })}
    </>
  );
};

export default BoxModel;
 