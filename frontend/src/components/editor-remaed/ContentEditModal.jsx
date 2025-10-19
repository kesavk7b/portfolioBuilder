import NavBarEditor from "./NavBarEditor";
import "../../assets/style/common.css";
import BodyContentEditor from "./BodyContentEdtior";

const ContentEditModal = ({openEditModal,setOpenModal,section,setSection})=>{
    if(!openEditModal) return null;
    const closeModal = () =>{
        setOpenModal(false)
        setSection("body")
    }
    return (
        <div
        className="scrollbar-wrapper"
            style={{
                height:"400px",
                width:"700px",
                position:"absolute",
                top:200,
                left:200,
                backgroundColor:"white",
                zIndex:1000,
                overflowY:"scroll",
            }}
        >
            <span
                style={{
                    padding:"5px",
                    position:"absolute",
                    backgroundColor:"red",
                    top:0,
                    right:0
                }}
                onClick={closeModal}
            >X</span>
            {section}
            {
                section==="navbar" && (
                    <NavBarEditor />
                ) ||

                section==="body" && (
                    <BodyContentEditor />
                )
            }
        </div>
    )
}

export default ContentEditModal;