import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// validate
export const duplicationCheck = async (field, value) => {
  try {
    const response = await axios.post(`${API_URL}/member/check-${field}`, {
      [field]: value,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch my Info: ", error);
    throw new Error("Failed to fetch my Info.");
  }
};

// 이미지 업로드
export const imageUpload = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/files/upload`, formData, 
      { 
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        } 
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    throw error;
  }
};