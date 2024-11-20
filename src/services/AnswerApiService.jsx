import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/answer";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 댓글 생성
export const createAnswer = async (answerData, token) => {
  try {
    const response = await axios.post(`${API_URL}`, answerData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 생성 실패: ", error);
    throw error;
  }
};

// 댓글 수정
export const updateAnswer = async (id, content) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, content, {
      headers: { "Content-Type": "text/plain" },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 수정 실패: ", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteAnswer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패: ", error);
    throw error;
  }
};
