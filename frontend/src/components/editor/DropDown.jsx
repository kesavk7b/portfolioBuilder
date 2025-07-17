import { useState } from "react";
import '/assets/style/common.css';
import { NavBarDefault } from "./navbars";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navbarPreviews = [
    { name: "NavbarOne", url: "/navbars/NavBarDefault.jsx" },
    { name: "NavbarTwo", url: "/navbars/NavBarTes.jsx" },
  ];

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <button
        onClick={handleToggle}
        style={{
          width: "100%",
          border: "none",
          textAlign: "justify",
          marginTop: "2px",
          padding: "0.5rem",
          background: "#eee",
          cursor: "pointer",
        }}
      >
        <span>Dropdown</span> <span style={{ float: "right" }}>▼</span>
      </button>

      {isOpen && (
        <ul
          style={{
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            margin: 0,
            listStyle: "none",
            width: "100%",
            zIndex: 1000,
          }}
        >
          {navbarPreviews.map(({ name, url }, i) => (
            <div key={i} style={{ marginBottom: "1rem" ,position:"relative",height:"48px"}}>
              <div className="item-selection d-flex" style={{alignItems:"center",justifyContent:"end"}}>
                <span style={{
                  fontSize: "32px",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#f0f0f0",
                  color: "#333",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>+</span>
              </div>
              <div className="scrollbar-wrapper"  style={{overflowX:"scroll",position:"relative",width:"300px",position:"absolute",top:0,left:0}}>
                <div style={{width:"1000px",border:"1px solid black"}}>
                 <NavBarDefault />
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
