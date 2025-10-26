import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useIframeRef } from "../../context/CommonToAll";

const ToolHolder = ({ selected }) => {
  const iframeRef = useIframeRef();

  useEffect(() => {
    const id = selected ? selected.id : null;
    if (!iframeRef?.current || !id) return;

    const elementInsideIframe = iframeRef.current.contentDocument?.getElementById(id);
    const parent = elementInsideIframe?.parentElement;//it will return the bordr style
    const par = parent?.parentElement;
    const display = par?.style.display;

  }, [selected, iframeRef]);

  return (
    <div className="flex flex-wrap align-center">
        <div className="flex items-center m-1 bg-blue-600 rounded-md">
            <ViewQuiltIcon color="bg-white" fontSize="large" />
        </div>
        <div className="flex items-center">
            <ViewQuiltIcon color="primary" fontSize="large" />
        </div>
        <div className="flex items-center">
            <ViewQuiltIcon color="primary" fontSize="large" />
        </div>
        <div className="flex items-center">
            <ViewQuiltIcon color="primary" fontSize="large" />
        </div>
    </div>
  );
};

export default ToolHolder;
