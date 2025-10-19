import UploadFile from "../../utils/UploadFile";

const UploadImg = () => {
    return (
        <div>
            {/* <input type="file" accept="image/*" className="form-control" />
            <button className="btn btn-primary m-1">Upload</button> */}

            <UploadFile />
        </div>
    )
}

export default UploadImg;