import { useRef } from "react"

const TextEditor = ({onChange,height="30vh",bg}) =>{

    const editorRef = useRef(null);

    const setCommand = (command)=>{
        document.execCommand(command,false,null)
    }

    const handleInput = (e) => {
        onChange(e.target.innerHTML);
    }
    return (
        <div>
            <div className="d-flex">
                <button  className="btn" onClick={()=>setCommand("bold")}>B</button>
                <button  className="btn" onClick={()=>setCommand("italic")}>i</button>
                <button  className="btn" onClick={()=>setCommand("bold")}>B</button>
                <button  className="btn" onClick={()=>setCommand("bold")}>B</button>
            </div>
            <div
                 contentEditable
                ref={editorRef}
                style={{
                    minHeight:height,
                    border:"1px solid black"
                }}
                onInput={handleInput}
            ></div>
        </div>
    )
}

export default TextEditor;