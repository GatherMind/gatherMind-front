import axios from "axios";
import api from "./api";

const API_URL = process.env.REACT_APP_API_URL;

if (!API_URL) {
  throw new Error("API URI: is not defined.");
}

// 스터디 생성
export const createStudy = async (studyData, token) => {
  try {
    // const response = api.post("/study", studyData, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    const response = await axios.post(`${API_URL}/study`, studyData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 스터디 수정
export const updateStudy = async (studyId, studyData) => {
  try {
    const response = await axios.put(`${API_URL}/study/${studyId}`, studyData);

    return response.data;
  } catch (error) {
    console.error("그룹 생성 에러 : ", error);
    throw error;
  }
};

// 스터디 정보, 멤버 조회, 게시판 조회
export const getStudyInfoAndMembersAndBoards = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/study/${id}/members`);

    return response.data;
  } catch (error) {
    console.error("Meeting data fetch error : ", error);
    throw new Error("Failed to fetch meeting data.");
  }
};

// 스터디 멤버, 게시판 조회
export const getStudyMembersAndBoards = async (id, pageNumber) => {
  try {
    const response = await axios.get(`${API_URL}/study/${id}/members/boards`, {
      params: { page: pageNumber, size: 5 },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting members: ", error);
    throw new Error("Failed to fetch meeting members.");
  }
};

// 스터디 멤버, 게시판 조회
export const getBoards = async (id, pageNumber) => {
  console.log("id", id);
  console.log("pageNumber", pageNumber);
  try {
    const response = await axios.get(`${API_URL}/study/${id}/boards`, {
      params: { page: pageNumber, size: 5 },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting members: ", error);
    throw new Error("Failed to fetch meeting members.");
  }
};

// 스터디 일정 조회
export const getStudySchedule = async (studyId) => {
  try {
    const response = await axios.get(`${API_URL}/study/${studyId}/schedules`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch meeting appointments: ", error);
    throw new Error("Failed to fetch meeting appointments.");
  }
};

// 스터디 아이디로 스터디 조회
export const getStudyById = async (studyId) => {
  try {
    const response = await axios.get(`${API_URL}/study/${studyId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch study info: ", error);
    throw new Error("Failed to fetch study info.");
  }
};

// 스터디 삭제
export const deleteStudy = async (studyId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/study/${studyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch study info: ", error);
    throw new Error("Failed to fetch study info.");
  }
};

// 게시글 조회
export const getQuestion = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/question/detail/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 조회 실패: ", error);
    throw error;
  }
};

// 댓글 조회
export const getAnswers = async (id, page) => {
  try {
    const response = await axios.get(`${API_URL}/question/${id}/answers?page=${page}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 조회 실패 : ", error);
    throw error;
  }
}

// 게시글 생성
export const createQuestion = async (memberId, studyId, questionData) => {
  console.log(questionData);
  try {
    const response = await axios.post(
      `${API_URL}/question?memberId=${memberId}&studyId=${studyId}`,
      questionData
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 생성 실패: ", error);
    throw error;
  }
};

// 게시글 수정
export const updateQuestion = async (id, questionData) => {
  try {
    const response = await axios.put(`${API_URL}/question/${id}`, questionData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 수정 실패: ", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/question/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패: ", error);
    throw error;
  }
};

// 댓글 생성
export const createAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${API_URL}/answer`, answerData);
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
    const response = await axios.put(`${API_URL}/answer/${id}`, content, {
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
    const response = await axios.delete(`${API_URL}/answer/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패: ", error);
    throw error;
  }
};

// 일정 조회
export const getSchedule = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/schedule/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 조회 실패: ", error);
    throw error;
  }
};

// 일정 생성
export const createSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(`${API_URL}/schedule`, scheduleData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 생성 실패: ", error);
    throw error;
  }
};

// 일정 수정
export const updateSchedule = async (id, scheduleData) => {
  try {
    const response = await axios.put(`${API_URL}/schedule/${id}`, scheduleData);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("일정 수정 실패: ", error);
    throw error;
  }
};

// 일정 삭제
export const deleteSchedule = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/schedule/${id}`);

    return response.data;
  } catch (error) {
    console.error("일정 삭제 실패: ", error);
    throw error;
  }
};

// 내 스터디 조회
export const getMyStudy = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/member/joined-groups`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.error("내 스터디 조회 실패 : ", error);
    throw error;
  }
};

// 내 정보 조회
export const getMyInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/member/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.error("내 정보 조회 실패 : ", error);
    throw error;
  }
};

// 전체 스터디 조회
export const getAllStudies = async () => {
  try {
    const response = await axios.get(`${API_URL}/study`);
    return response;
  } catch (error) {
    console.error("전체 스터디 조회 : ", error);
    throw error;
  }
};

export const applyStudy = async (studyId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/study-members`,
      { studyId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("스터디 지원 실패 : ", error);
    throw error;
  }
};

export const confirmStudyMember = async ({ studyId, memberId }, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/study-members`,
      { studyId, memberId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    console.error("스터디 승인 실패 : ", error);
    throw error;
  }
};
