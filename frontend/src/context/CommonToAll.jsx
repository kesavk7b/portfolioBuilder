import { createContext, useContext, useRef, useState } from "react";

export const CommonToAllContext = createContext();

export const CommonToAllProvider = ({ children }) => {
  const [propertyToolActive,setPropertyToolActive] = useState(false);
  const iframeRef = useRef(null); // rename to iframeRef

  return (
    <CommonToAllContext.Provider value={{ propertyToolActive,setPropertyToolActive, iframeRef }}>
      {children}
    </CommonToAllContext.Provider>
  );
};

// Custom hook to access the iframe ref
export const useIframeRef = () => {
  const context = useContext(CommonToAllContext);
  if (!context) throw new Error("useIframeRef must be used within CommonToAllProvider");
  return context.iframeRef;
};
