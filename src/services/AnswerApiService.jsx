import apiClient from "./apiClient";

// 댓글 생성
export const createAnswer = async (answerData, token) => {
  try {
    const response = await apiClient.post(`/answer`, answerData);
    return response.data;
  } catch (error) {
    console.error("댓글 생성 실패: ", error);
    throw error;
  }
};

// 댓글 수정
export const updateAnswer = async (id, content, token) => {
  try {
    const response = await apiClient.put(`/answer/${id}`, content, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("댓글 수정 실패: ", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteAnswer = async (id, token) => {
  try {
    const response = await apiClient.delete(`/answer/${id}`);
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패: ", error);
    throw error;
  }
};
