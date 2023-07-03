import axios from "axios";

export const serverUrl = "http://localhost:8000/api";

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fiverr");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/atm1x/image/upload",
      formData
    );
    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
}

export default uploadFile;
