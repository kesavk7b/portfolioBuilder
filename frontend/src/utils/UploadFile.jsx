import React, { useState } from "react";
import axios from "axios";

function UploadFile() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "unsigned_upload"); // your preset

  //   try {
  //     const res = await axios.post(
  //       "https://api.cloudinary.com/v1_1/dhgaenrev/upload",
  //       formData
  //     );
  //     console.log("Uploaded:", res.data.secure_url);
  //     setImageUrl(res.data.secure_url);

  //     // Now send the URL to your Django backend to save in DB
  //     // await axios.post("http://localhost:8000//save-image-url/", {
  //     //   image_url: res.data.secure_url,
  //     //   user_id: 1, // optional: send user ID if required
  //     // });
  //   } catch (err) {
  //     console.error("Upload error:", err);
  //   }
  // };

const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset");

  try {
    console.log("Uploading file:", file);
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dhgaenrev/image/upload",
      formData
    );
    console.log("✅ Uploaded file URL:", res.data.secure_url);
    setImageUrl(res.data.secure_url);
  } catch (err) {
    console.error("❌ Upload error:", err); // log full error
    alert(err?.response?.data?.error?.message || err.message || "Unknown error");
  }
};


  return (
    <div>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={() => handleUpload(image)}>Upload to Cloudinary</button>

      {imageUrl && <img src={imageUrl} alt="Uploaded" width="200" />}
    </div>
  );
}

export default UploadFile;
