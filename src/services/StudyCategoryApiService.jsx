import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/study-categories";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}
// 카테고리 조회
export const getStudyCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}`);

    return response.data;
  } catch (error) {
    console.error("카테고리 조회 에러 : ", error);
    throw error;
  }
};
