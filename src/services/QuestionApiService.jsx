import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL + "/question";

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 댓글 조회
export const getAnswers = async (id, page) => {
  try {
    const response = await apiClient.get(
      `/question/${id}/answers?page=${page}`
    );

    return response.data;
  } catch (error) {
    console.error("댓글 조회 실패 : ", error);
    throw error;
  }
};

// 게시글 생성
export const createQuestion = async (studyId, questionData, token) => {
  try {
    const response = await apiClient.post(
      `/question?studyId=${studyId}`,
      questionData
    );
    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw error;
  }
};

// 게시글 수정
export const updateQuestionWithFile = async (id, questionData, token) => {
  try {
    const response = await apiClient.put(`/question/${id}`, questionData);

    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패: ", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteQuestion = async (id, token) => {
  try {
    const response = await apiClient.delete(`/question/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패: ", error);
    throw error;
  }
};

// 게시글 조회
export const getQuestionWithFileUrl = async (id) => {
  try {
    const response = await apiClient.get(`/question/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 조회 실패: ", error);
    throw error;
  }
};
